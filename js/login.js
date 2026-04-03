window.thongBaoXinXo = function(loiNhan, laThanhCong = true, hanhDongTiepTheo = null) {
    const nenMo = document.createElement('div');
    nenMo.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); z-index: 9999; display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s ease;';
    const hopThongBao = document.createElement('div');
    hopThongBao.style.cssText = 'background: white; padding: 35px 20px; border-radius: 20px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.2); max-width: 420px; width: 90%; transform: translateY(-50px); transition: transform 0.3s ease;';
    const mauSac = laThanhCong ? '#28a745' : '#e5002d';
    const iconClass = laThanhCong ? 'fa-check-circle' : 'fa-exclamation-circle';
    const tieuDe = laThanhCong ? 'Tuyệt vời!' : 'Chú ý!';

    hopThongBao.innerHTML = `<i class="fas ${iconClass}" style="color: ${mauSac}; font-size: 60px; margin-bottom: 20px;"></i><h3 style="margin-bottom: 10px; color: #333; font-size: 24px;">${tieuDe}</h3><p style="color: #666; line-height: 1.6; margin-bottom: 25px; font-size: 16px;">${loiNhan}</p><button id="btn-dong-popup" style="background: ${mauSac}; color: white; border: none; padding: 12px 40px; border-radius: 30px; font-size: 16px; cursor: pointer; font-weight: bold;">Đồng ý</button>`;
    nenMo.appendChild(hopThongBao); document.body.appendChild(nenMo);
    setTimeout(() => { nenMo.style.opacity = '1'; hopThongBao.style.transform = 'translateY(0)'; }, 10);

    document.getElementById('btn-dong-popup').addEventListener('click', function() {
        if (typeof hanhDongTiepTheo === 'function') hanhDongTiepTheo();
        else {
            nenMo.style.opacity = '0'; hopThongBao.style.transform = 'translateY(-50px)';
            setTimeout(() => { if (document.body.contains(nenMo)) document.body.removeChild(nenMo); }, 300);
        }
    });
};

document.addEventListener("DOMContentLoaded", function() {
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');
    const goToRegister = document.getElementById('go-to-register');
    const goToLogin = document.getElementById('go-to-login');

    if(goToRegister) goToRegister.addEventListener('click', function(e) { e.preventDefault(); formLogin.style.display = 'none'; formRegister.style.display = 'block'; });
    if(goToLogin) goToLogin.addEventListener('click', function(e) { e.preventDefault(); formRegister.style.display = 'none'; formLogin.style.display = 'block'; });

    if(formRegister) {
        formRegister.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const username = document.getElementById('reg-username').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const phone = document.getElementById('reg-phone').value.trim();
            const pass = document.getElementById('reg-password').value;
            const repass = document.getElementById('reg-repassword').value;

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return thongBaoXinXo('Định dạng Email không đúng!', false);
            if (!/^[0-9]{10}$/.test(phone)) return thongBaoXinXo('Số điện thoại không hợp lệ (Cần 10 số)!', false);
            if (pass !== repass) return thongBaoXinXo('Mật khẩu nhập lại không khớp!', false);
            if (localStorage.getItem('user_' + username)) return thongBaoXinXo('Tên đăng nhập đã tồn tại!', false);

            localStorage.setItem('user_' + username, JSON.stringify({ matKhau: pass, email: email, soDienThoai: phone }));
            thongBaoXinXo('Tạo tài khoản thành công!', true, function() { formRegister.style.display = 'none'; formLogin.style.display = 'block'; formRegister.reset(); });
        });
    }

    if(formLogin) {
        formLogin.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const pass = document.getElementById('login-password').value;
            const dataDaLuu = localStorage.getItem('user_' + username);

            if (dataDaLuu) {
                let matKhauDung = false;
                try { const tk = JSON.parse(dataDaLuu); if (tk.matKhau === pass) matKhauDung = true; } 
                catch (error) { if (dataDaLuu === pass) matKhauDung = true; }

                if (matKhauDung) {
                    localStorage.setItem('nguoiDungHienTai', username);
                    thongBaoXinXo(`Đăng nhập thành công! Chào mừng <b>${username}</b>.`, true, function() { window.location.href = 'index.html'; });
                } else { thongBaoXinXo('Mật khẩu không chính xác!', false); }
            } else { thongBaoXinXo('Tên đăng nhập không tồn tại!', false); }
        });
    }
});