/* UI prototype only: no password storage, email delivery or real OAuth exchange. */
(() => {
  const page = document.body.dataset.authPage;
  const registering = page === 'register';
  const panel = document.querySelector('#auth-panel');
  const dialog = document.querySelector('#oauth-dialog');
  const DEMO_OTP = '123456';
  const PENDING_KEY = `di-thuong-auth-pending-${page}`;
  const SESSION_KEY = 'di-thuong-auth-session';
  let challenge = null;
  let interval = null;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read = (storage, key) => { try { return JSON.parse(storage.getItem(key)); } catch { return null; } };
  const write = (storage, key, value) => { try { storage.setItem(key, JSON.stringify(value)); } catch {} };
  const remove = (storage, key) => { try { storage.removeItem(key); } catch {} };
  const errorFor = (field, message) => {
    const input = panel.querySelector(`#${field}`);
    input?.setAttribute('aria-invalid', message ? 'true' : 'false');
    const error = panel.querySelector(`#${field}-error`);
    if (error) error.textContent = message;
  };
  function field(id, label, type, placeholder, autocomplete, help = '') {
    const password = type === 'password';
    return `<div class="field"><label for="${id}">${label}</label>${password ? '<div class="password-wrap">' : ''}<input id="${id}" name="${id}" type="${type}" placeholder="${placeholder}" autocomplete="${autocomplete}" required aria-describedby="${id}-error${help ? ` ${id}-help` : ''}" ${id === 'username' ? 'maxlength="24" autocapitalize="none" spellcheck="false"' : ''} ${type === 'email' ? 'maxlength="254"' : ''} ${password ? 'maxlength="128"' : ''}>${password ? `<button type="button" class="password-toggle" data-toggle="${id}" aria-label="Hiện ${label.toLowerCase()}" aria-pressed="false">Hiện</button></div>` : ''}${help ? `<small id="${id}-help">${help}</small>` : ''}<p id="${id}-error" class="field-error" aria-live="polite"></p></div>`;
  }
  function renderForm() {
    clearInterval(interval);
    panel.innerHTML = `<h1>${registering ? 'Tạo tài khoản' : 'Chào bạn trở lại.'}</h1><p class="intro">${registering ? 'Tham gia cộng đồng và bắt đầu chia sẻ những điều bạn thấy.' : 'Đăng nhập để tiếp nối những cuộc trao đổi của bạn.'}</p><button class="auth-button" type="button" data-action="google"><span class="provider-mark" aria-hidden="true">G</span>${registering ? 'Đăng ký' : 'Tiếp tục'} với Google</button><div class="divider">hoặc dùng tên đăng nhập</div><form id="credentials-form" novalidate><div class="form-error" id="form-error" role="alert"></div>${field('username','Tên đăng nhập','text','Ví dụ: minhanh','username', registering ? '3–24 ký tự: chữ không dấu, số hoặc dấu gạch dưới.' : '')}${registering ? field('email','Email','email','ban@example.com','email','Email dùng để xác thực và nhận mã OTP.') : ''}${field('password','Mật khẩu','password','Ít nhất 8 ký tự',registering ? 'new-password' : 'current-password',registering ? 'Ít nhất 8 ký tự, có chữ và số.' : '')}${registering ? field('confirm','Nhập lại mật khẩu','password','Nhập lại mật khẩu','new-password') : '<label class="remember"><input type="checkbox" id="remember" name="remember">Nhớ tên đăng nhập trên thiết bị này</label>'}<button type="submit" class="auth-button primary">${registering ? 'Tạo tài khoản' : 'Đăng nhập'} <span aria-hidden="true">→</span></button></form><p class="auth-switch">${registering ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}<a href="${registering ? 'login.html' : 'register.html'}">${registering ? 'Đăng nhập' : 'Đăng ký'}</a></p><p class="demo-note">Bản thử: dùng tên bất kỳ hợp lệ và mật khẩu từ 8 ký tự có chữ, số. ${registering ? 'Email không được gửi thật.' : 'Email minh họa nhận OTP: minhanh@example.com.'} Không lưu mật khẩu.</p>`;
    if (!registering) {
      const remembered = read(localStorage, 'di-thuong-auth-username');
      if (typeof remembered === 'string') { panel.querySelector('#username').value = remembered; panel.querySelector('#remember').checked = true; }
    }
  }
  function startChallenge(identity) {
    challenge = {...identity, page, expiresAt:Date.now()+5*60*1000, resendAt:Date.now()+30*1000, attempts:0};
    write(sessionStorage,PENDING_KEY,challenge);
    renderOTP();
  }
  function renderOTP() {
    clearInterval(interval);
    panel.innerHTML = `<div class="otp-progress" aria-label="Tiến trình"><span>${registering ? 'Tài khoản' : 'Đăng nhập'}</span><span aria-hidden="true">→</span><span class="current">Xác thực email</span></div><h1>Kiểm tra email nhé.</h1><p class="intro">Nhập mã 6 chữ số để ${registering ? 'hoàn tất đăng ký' : 'xác thực đăng nhập'}.<span class="email-target">${esc(challenge.email)}</span></p><form id="otp-form" novalidate><div class="field otp-field"><label for="otp">Mã xác thực OTP</label><input id="otp" name="otp" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" placeholder="000000" required aria-describedby="otp-error otp-help"><small id="otp-help">Mã có hiệu lực trong 5 phút.</small><p id="otp-error" class="field-error" role="alert"></p></div><p class="notice" id="otp-notice" role="status"></p><button type="submit" id="verify-button" class="auth-button primary">Xác thực & tiếp tục <span aria-hidden="true">→</span></button></form><div class="otp-footer"><span id="otp-expiry"></span><button class="text-button" id="resend" data-action="resend" type="button"></button></div><button type="button" class="text-button back-step" data-action="back">← ${registering ? 'Sửa thông tin đăng ký' : 'Đổi cách đăng nhập'}</button><p class="demo-note">Mã OTP mẫu: <strong>${DEMO_OTP}</strong>. Bản thử không gửi email thật; Google và OTP đều mô phỏng.</p>`;
    tick(); interval = setInterval(tick,1000);
    panel.querySelector('#otp').focus();
  }
  function tick() {
    if (!challenge || !panel.querySelector('#otp')) return;
    const left = Math.max(0,Math.ceil((challenge.expiresAt-Date.now())/1000));
    const cooldown = Math.max(0,Math.ceil((challenge.resendAt-Date.now())/1000));
    const locked = challenge.attempts >= 5;
    panel.querySelector('#otp-expiry').textContent = left ? `Còn ${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}` : 'Mã đã hết hạn';
    panel.querySelector('#resend').disabled = cooldown > 0;
    panel.querySelector('#resend').textContent = cooldown ? `Gửi lại sau ${cooldown}s` : 'Gửi lại mã';
    panel.querySelector('#verify-button').disabled = !left || locked;
    if (!left) errorFor('otp','Mã đã hết hạn. Hãy yêu cầu một mã mới.');
    else if (locked) errorFor('otp','Bạn đã nhập sai 5 lần. Hãy yêu cầu một mã mới.');
  }
  function renderSuccess() {
    clearInterval(interval);
    const identity = {...challenge, verifiedAt:Date.now()};
    write(sessionStorage,SESSION_KEY,{username:identity.username,email:identity.email,provider:identity.provider,verifiedAt:identity.verifiedAt});
    remove(sessionStorage,PENDING_KEY); challenge = null;
    panel.innerHTML = `<div class="success-symbol" aria-hidden="true">✓</div><h1>${registering ? 'Chào mừng bạn!' : 'Đăng nhập thành công.'}</h1><p class="intro">${registering ? 'Email đã được xác thực trong bản thử. Bạn có thể bắt đầu khám phá cộng đồng.' : 'Bạn đã hoàn tất bước xác thực OTP trong bản thử.'}</p><div class="account-line"><span class="account-avatar" aria-hidden="true">${esc(identity.username.slice(0,2).toUpperCase())}</span><div><strong>${esc(identity.username)}</strong><small>${esc(identity.email)}</small></div></div><a class="auth-button primary" href="index.html#forum">Vào diễn đàn <span aria-hidden="true">↗</span></a><a class="success-link" href="index.html#map">Khám phá bản đồ</a><button type="button" class="text-button back-step" data-action="logout">Đăng xuất khỏi phiên thử</button><p class="demo-note">Phiên xác thực chỉ dùng để demo. Nội dung diễn đàn vẫn sử dụng tài khoản mẫu Minh Anh.</p>`;
    panel.querySelector('h1').setAttribute('tabindex','-1'); panel.querySelector('h1').focus();
  }
  function openGoogle() {
    dialog.innerHTML = `<h2 id="oauth-title">Tiếp tục với Google</h2><p>Chọn tài khoản minh họa để thử luồng OAuth.</p><button class="account-line oauth-demo-account" type="button" data-action="google-account"><span class="account-avatar" aria-hidden="true">MA</span><span><strong>Minh Anh</strong><small>minhanh@example.com</small></span></button><p class="demo-note">Đây là mô phỏng trong prototype. Chưa kết nối tài khoản hoặc dịch vụ Google thật. Sau bước này, bản thử yêu cầu OTP để minh họa xác thực bổ sung.</p><button class="text-button" type="button" data-action="cancel-google">Hủy, quay lại</button>`;
    dialog.showModal();
  }
  panel.addEventListener('submit', e => {
    e.preventDefault();
    if (e.target.id === 'otp-form') {
      if (!challenge) return;
      if (Date.now() >= challenge.expiresAt || challenge.attempts >= 5) { tick(); return; }
      const otp = panel.querySelector('#otp').value.trim();
      if (!/^\d{6}$/.test(otp)) { errorFor('otp','Nhập đủ 6 chữ số trong mã xác thực.'); panel.querySelector('#otp').focus(); return; }
      if (otp !== DEMO_OTP) {
        challenge.attempts++; write(sessionStorage,PENDING_KEY,challenge);
        errorFor('otp',`Mã chưa đúng. Còn ${5-challenge.attempts} lần thử.`); tick(); return;
      }
      renderSuccess(); return;
    }
    const username = panel.querySelector('#username').value.trim();
    const password = panel.querySelector('#password').value;
    const email = registering ? panel.querySelector('#email').value.trim() : 'minhanh@example.com';
    const errors = {};
    if (!/^[a-zA-Z0-9_]{3,24}$/.test(username)) errors.username = 'Dùng 3–24 ký tự: chữ không dấu, số hoặc dấu gạch dưới.';
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) errors.password = 'Mật khẩu cần ít nhất 8 ký tự, có chữ và số.';
    if (registering) {
      if (!email || !panel.querySelector('#email').validity.valid) errors.email = 'Nhập một địa chỉ email hợp lệ.';
      if (panel.querySelector('#confirm').value !== password || !password) errors.confirm = 'Mật khẩu nhập lại chưa khớp.';
    }
    ['username','email','password','confirm'].forEach(id => errorFor(id,errors[id] || ''));
    if (Object.keys(errors).length) { panel.querySelector(`#${Object.keys(errors)[0]}`).focus(); return; }
    if (!registering) {
      if (panel.querySelector('#remember').checked) write(localStorage,'di-thuong-auth-username',username);
      else remove(localStorage,'di-thuong-auth-username');
    }
    startChallenge({username,email,provider:'password'});
  });
  document.addEventListener('click', e => {
    const toggle = e.target.closest('[data-toggle]');
    if (toggle) {
      const input = panel.querySelector(`#${toggle.dataset.toggle}`);
      const showing = input.type === 'password'; input.type = showing ? 'text' : 'password';
      toggle.textContent = showing ? 'Ẩn' : 'Hiện'; toggle.setAttribute('aria-pressed',String(showing));
      toggle.setAttribute('aria-label',`${showing ? 'Ẩn' : 'Hiện'} ${panel.querySelector(`label[for="${input.id}"]`).textContent.toLowerCase()}`); return;
    }
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'google') openGoogle();
    if (action === 'cancel-google') dialog.close();
    if (action === 'google-account') { dialog.close(); startChallenge({username:'minhanh',email:'minhanh@example.com',provider:'google'}); }
    if (action === 'back') { remove(sessionStorage,PENDING_KEY); challenge=null; renderForm(); panel.querySelector('#username').focus(); }
    if (action === 'logout') { remove(sessionStorage,SESSION_KEY); renderForm(); }
    if (action === 'resend' && challenge && Date.now() >= challenge.resendAt) {
      challenge.expiresAt=Date.now()+5*60*1000; challenge.resendAt=Date.now()+30*1000; challenge.attempts=0;
      write(sessionStorage,PENDING_KEY,challenge); errorFor('otp',''); panel.querySelector('#otp').value='';
      panel.querySelector('#otp-notice').textContent='Đã tạo mã mẫu mới. Mã demo vẫn là 123456.'; tick(); panel.querySelector('#otp').focus();
    }
  });
  panel.addEventListener('input', e => {
    if (e.target.id === 'otp') e.target.value = e.target.value.replace(/\D/g,'').slice(0,6);
    if (e.target.id && e.target.matches('input')) errorFor(e.target.id,'');
  });
  window.addEventListener('pagehide', () => clearInterval(interval));
  const pending = read(sessionStorage,PENDING_KEY);
  if (pending && pending.page === page && typeof pending.username === 'string' && typeof pending.email === 'string' && Number.isFinite(pending.expiresAt) && Number.isFinite(pending.resendAt) && Number.isInteger(pending.attempts)) { challenge=pending; renderOTP(); }
  else renderForm();
})();
