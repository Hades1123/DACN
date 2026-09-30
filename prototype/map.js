/* MapLibre globe with local geography. Optional streets/terrain use online tiles. */
(() => {
  const areas = {
    mykhe: { name: 'Mỹ Khê, Đà Nẵng', coordinates: [108.25, 16.06] },
    thuanphuoc: { name: 'Thuận Phước, Đà Nẵng', coordinates: [108.22, 16.10] },
    sontra: { name: 'Sơn Trà, Đà Nẵng', coordinates: [108.27, 16.12] },
    cangio: { name: 'Cần Giờ, TP. Hồ Chí Minh', coordinates: [106.88, 10.41] },
    hanoi: { name: 'Hà Nội', coordinates: [105.84, 21.03] },
    hcm: { name: 'TP. Hồ Chí Minh', coordinates: [106.70, 10.78] },
  };
  const sampleAreas = { r102: 'mykhe', r108: 'thuanphuoc', r115: 'sontra', r120: 'cangio' };
  const coordinateOf = r => {
    const p = r.publicCoordinates || areas[sampleAreas[r.id]]?.coordinates;
    return Array.isArray(p) && p.length === 2 && p.every(Number.isFinite) && Math.abs(p[0]) <= 180 && Math.abs(p[1]) <= 90 ? p : null;
  };
  const colors = { sky:'#73e4ef', mystery:'#afc2fa', nature:'#a3e6c8', unknown:'#d7e5eb' };
  const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let map = null, records = [], markers = new Map(), labels = [], selected = null, popup = null;
  let ready = false;
  let mode = 'globe', camera = null, loading = null, serial = 0, callbacks = {}, terrainTimer = null;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  function script(src) {
    return new Promise((resolve,reject) => {
      const el=document.createElement('script'); el.src=src; el.onload=resolve;
      el.onerror=()=>{el.remove();reject(new Error(`Không tải được ${src}`));}; document.head.append(el);
    });
  }
  function loadLibraries() {
    if (!loading) loading=Promise.all([
      window.maplibregl ? Promise.resolve() : script('vendor/maplibre/maplibre-gl.js'),
      window.PROTOTYPE_LAND ? Promise.resolve() : script('assets/maps/world-land.js'),
    ]).catch(e=>{loading=null;throw e;});
    return loading;
  }
  function features() {
    return {type:'FeatureCollection',features:records.filter(r=>coordinateOf(r)).map(r=>({
      type:'Feature', geometry:{type:'Point',coordinates:coordinateOf(r)},properties:{id:r.id,category:r.category},
    }))};
  }
  function status(text, error=false) {
    const el=document.querySelector('#map-status'); if(!el)return;
    el.textContent=text; el.classList.toggle('map-status-error',error);
  }
  function unmount() {
    serial++; ready=false; clearTimeout(terrainTimer);
    if(map){camera={center:map.getCenter().toArray(),zoom:map.getZoom(),pitch:map.getPitch(),bearing:map.getBearing()};map.remove();map=null;}
    markers.clear();labels=[];popup=null;
  }
  async function mount(options) {
    unmount();const token=serial;records=options.reports;selected=options.selected;callbacks=options;
    const container=document.getElementById('report-map'); if(!container)return;
    status('Đang khởi tạo bản đồ…');
    try {
      await loadLibraries();if(token!==serial||!container.isConnected)return;
      map=new maplibregl.Map({
        container,center:camera?.center||[108,16],zoom:camera?.zoom||1.6,
        pitch:camera?.pitch||0,bearing:camera?.bearing||0,maxZoom:16,maxPitch:75,
        canvasContextAttributes:{antialias:true},attributionControl:false,
        style:{version:8,projection:{type:mode==='globe'?'globe':'mercator'},
          sources:{land:{type:'geojson',data:window.PROTOTYPE_LAND},reports:{type:'geojson',data:features(),cluster:true,clusterRadius:48,clusterMaxZoom:11}},
          layers:[{id:'ocean',type:'background',paint:{'background-color':'#0c273c'}},
            {id:'land',type:'fill',source:'land',paint:{'fill-color':['case',['==',['get','iso'],'VNM'],'#24596b','#1c3c4c'],'fill-opacity':1}},
            {id:'borders',type:'line',source:'land',paint:{'line-color':'#598c9d','line-width':.6,'line-opacity':.7}},
            // Invisible circle layer keeps the clustered source active; accessible DOM markers render the points.
            {id:'report-source',type:'circle',source:'reports',paint:{'circle-radius':0,'circle-opacity':0}},
          ],sky:{'sky-color':'#081521','horizon-color':'#286179','fog-color':'#0c2838','sky-horizon-blend':.6,'horizon-fog-blend':.4,'fog-ground-blend':.3}},
      });
      map.addControl(new maplibregl.NavigationControl({visualizePitch:true}),'top-right');
      map.addControl(new maplibregl.FullscreenControl(),'top-right');
      map.addControl(new maplibregl.AttributionControl({compact:true,customAttribution:'Địa lý: <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a> · Báo cáo minh họa'}),'bottom-right');
      map.on('load',()=>{
        if(token!==serial)return;
        ready=true;
        status('Kéo để di chuyển · Cuộn để zoom · Chuột phải kéo để xoay');
        addLabels();updateMarkers();syncModeButtons();
        if(mode==='terrain')setMode('terrain',false);
        if(options.focusId)focusReport(options.focusId);
      });
      map.on('render',()=>{if(map?.isSourceLoaded('reports'))updateMarkers();});
      map.on('zoomend',()=>{
        if(map.getZoom()>=5&&navigator.onLine)addStreets();
        labels.forEach(({marker,city})=>marker.getElement().hidden=city&&map.getZoom()<4);
      });
      map.on('error',event=>{
        if(token!==serial)return;
        if(event.sourceId==='terrain-dem'){
          map.setTerrain(null);clearTimeout(terrainTimer);
          status('Chưa tải được độ cao. Vẫn có thể xoay bản đồ nghiêng hoặc dùng Trái Đất.',true);
        }else if(event.sourceId==='streets')status('Không tải được đường phố; địa lý và điểm báo cáo vẫn hiển thị.',true);
      });
      map.getCanvas().addEventListener('webglcontextlost',()=>status('Bản đồ mất kết nối đồ họa. Nhấn tải lại hoặc xem danh sách bên dưới.',true));
    }catch(e){
      if(token!==serial)return;
      container.innerHTML='<div class="map-unavailable"><strong>Chưa mở được bản đồ 3D</strong><p>Trình duyệt cần hỗ trợ WebGL. Bạn vẫn có thể xem các báo cáo bên dưới.</p><button class="button secondary" data-map-command="retry">Thử lại</button></div>';
      status('Bản đồ chưa sẵn sàng; danh sách báo cáo vẫn dùng được.',true);
    }
  }
  function addLabels() {
    const places=[{name:'VIỆT NAM',p:[106.5,17.4],city:false},{name:'Hà Nội',p:[105.84,21.03],city:true},{name:'Đà Nẵng',p:[108.2,16.05],city:true},{name:'TP. Hồ Chí Minh',p:[106.7,10.78],city:true}];
    labels=places.map(p=>{
      const el=document.createElement('span');el.className='map-city-label';el.textContent=p.name;
      el.hidden=p.city&&map.getZoom()<4; const marker=new maplibregl.Marker({element:el,anchor:'top',offset:[0,15]}).setLngLat(p.p).addTo(map);
      return {marker,city:p.city};
    });
  }
  function updateMarkers() {
    if(!map?.isSourceLoaded('reports'))return;
    const visible=new Map();
    for(const f of map.querySourceFeatures('reports')){
      const isCluster=!!f.properties.cluster,key=isCluster?`c${f.properties.cluster_id}`:f.properties.id;
      if(visible.has(key))continue;
      let item=markers.get(key);
      if(!item){
        const el=document.createElement('button');el.type='button';el.className=`geo-marker ${isCluster?'geo-cluster':''}`;
        if(isCluster){
          el.textContent=f.properties.point_count;el.setAttribute('aria-label',`${f.properties.point_count} báo cáo trong cụm. Nhấn để xem.`);
          el.addEventListener('click',async()=>{
            const current=map;if(!current)return;
            try{const leaves=await current.getSource('reports').getClusterLeaves(f.properties.cluster_id,100,0);if(current!==map)return;
              const ids=leaves.map(l=>l.properties.id);callbacks.onCluster?.(ids,()=>zoomCluster(f));
            }catch{status('Cụm đã thay đổi. Hãy chọn lại trên bản đồ.',true);}
          });
        }else{
          const r=records.find(r=>r.id===key);if(!r)continue;
          el.innerHTML='<span class="geo-dot"></span>';el.style.setProperty('--marker-color',colors[r.category]||colors.unknown);
          el.setAttribute('aria-label',r.title);el.addEventListener('click',()=>select(key,true));
        }
        item={marker:new maplibregl.Marker({element:el}).setLngLat(f.geometry.coordinates).addTo(map),element:el};
      }
      item.element.classList.toggle('selected',!isCluster&&key===selected);visible.set(key,item);
    }
    for(const [key,item]of markers)if(!visible.has(key))item.marker.remove();
    markers=visible;
  }
  async function zoomCluster(f) {
    const current=map; if(!current)return;
    try{const zoom=await current.getSource('reports').getClusterExpansionZoom(f.properties.cluster_id);if(current!==map)return;
      map.easeTo({center:f.geometry.coordinates,zoom:Math.min(zoom+.4,16),duration:reduced()?0:700});
    }catch{}
  }
  function select(id,showPopup=true) {
    selected=id; const r=records.find(r=>r.id===id);if(!r||!map)return;
    updateMarkers(); callbacks.onSelect?.(id);popup?.remove();
    if(showPopup&&coordinateOf(r)){
      const el=document.createElement('div');el.className='geo-popup-body';
      el.innerHTML=`<span class="geo-popup-kind">Báo cáo · Điểm khu vực minh họa</span><strong>${escape(r.title)}</strong><p>${escape(r.location)}</p><a href="#thread/${escape(r.id)}">Mở báo cáo & thảo luận →</a>`;
      popup=new maplibregl.Popup({closeButton:true,maxWidth:'300px',offset:17}).setLngLat(coordinateOf(r)).setDOMContent(el).addTo(map);
    }
  }
  function focusReport(id) {
    const r=records.find(r=>r.id===id),p=r&&coordinateOf(r);if(!p||!map)return;
    mode='flat';map.setProjection({type:'mercator'});map.setTerrain(null);syncModeButtons();
    map.easeTo({center:p,zoom:10,pitch:0,bearing:0,duration:reduced()?0:800});select(id,true);addStreets();
  }
  function addStreets() {
    if(!map||map.getSource('streets')||location.protocol==='file:')return;
    map.addSource('streets',{type:'raster',tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],tileSize:256,maxzoom:19,
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'});
    map.addLayer({id:'street-tiles',type:'raster',source:'streets',minzoom:5,paint:{'raster-opacity':.92,'raster-saturation':-1,'raster-brightness-max':.46,'raster-contrast':.15}},'report-source');
  }
  function syncModeButtons() {
    document.querySelectorAll('[data-map-mode]').forEach(el=>{el.classList.toggle('active',el.dataset.mapMode===mode);el.setAttribute('aria-pressed',String(el.dataset.mapMode===mode));});
  }
  function setMode(next,animate=true) {
    if(!map||!ready){status('Chờ bản đồ tải xong để đổi góc nhìn.');return;}
    mode=next;popup?.remove();clearTimeout(terrainTimer);syncModeButtons();
    const r=records.find(r=>r.id===selected),p=(r&&coordinateOf(r))||[108.22,16.10];
    const duration=animate&&!reduced()?900:0;
    map.setProjection({type:mode==='globe'?'globe':'mercator'});
    if(mode!=='terrain')map.setTerrain(null);
    if(mode==='globe'){
      map.easeTo({center:[108,16],zoom:1.6,pitch:0,bearing:0,duration});status('Địa cầu 3D · Kéo để xoay, cuộn để zoom vào Việt Nam.');
    }else if(mode==='flat'){
      map.easeTo({center:[107.4,16.2],zoom:5,pitch:0,bearing:0,duration});addStreets();status('Bản đồ 2D · Có thể zoom đến từng khu vực báo cáo.');
    }else{
      addStreets();
      if(!navigator.onLine){map.easeTo({center:p,zoom:11.5,pitch:62,bearing:-25,duration});status('Đang ngoại tuyến: chỉ có góc nhìn nghiêng, chưa tải được độ cao địa hình.',true);return;}
      if(!map.getSource('terrain-dem'))map.addSource('terrain-dem',{type:'raster-dem',url:'https://tiles.mapterhorn.com/tilejson.json',tileSize:512,encoding:'terrarium'});
      map.setTerrain({source:'terrain-dem',exaggeration:1.25});
      map.easeTo({center:p,zoom:11.5,pitch:62,bearing:-25,duration});
      status('Đang tải độ cao địa hình…');
      const onData=e=>{if(e.sourceId==='terrain-dem'&&e.isSourceLoaded&&mode==='terrain'){clearTimeout(terrainTimer);status('Địa hình 3D · Độ cao được phóng đại 1,25× để dễ quan sát.');map.off('sourcedata',onData);}};
      map.on('sourcedata',onData);
      terrainTimer=setTimeout(()=>{if(mode==='terrain')status('Độ cao tải chậm. Bạn có thể dùng Trái Đất hoặc 2D.',true);map?.off('sourcedata',onData);},15000);
    }
  }
  function home() {
    if(!map)return;
    if(mode==='terrain'){setMode('terrain');return;}
    map.easeTo({center:[107.4,16.2],zoom:mode==='globe'?3:5,pitch:0,bearing:0,duration:reduced()?0:700});
  }
  function zoom(amount){map?.easeTo({zoom:Math.max(0,Math.min(16,map.getZoom()+amount)),duration:reduced()?0:300});}
  function retry(){camera=null;mount({...callbacks,reports:records,selected});}
  function cameraState(){return map?{mode,zoom:map.getZoom(),pitch:map.getPitch(),projection:map.getProjection().type}:null;}
  window.ReportMap={mount,unmount,setMode,home,zoom,select,focusReport,retry,coordinateOf,areas,cameraState};
})();
