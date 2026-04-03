// ==========================================
// HÀM POPUP DÙNG CHUNG (Để ngoài để gọi được từ mọi nơi)
// ==========================================
window.thongBaoXinXo = function(loiNhan, laThanhCong = true, hanhDongTiepTheo = null) {
    const nenMo = document.createElement('div');
    nenMo.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.6); z-index: 9999; display: flex; justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s ease;';

    const hopThongBao = document.createElement('div');
    hopThongBao.style.cssText = 'background: white; padding: 35px 20px; border-radius: 20px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.2); max-width: 420px; width: 90%; transform: translateY(-50px); transition: transform 0.3s ease;';

    const mauSac = laThanhCong ? '#28a745' : '#e5002d';
    const iconClass = laThanhCong ? 'fa-check-circle' : 'fa-exclamation-circle';
    const tieuDe = laThanhCong ? 'Tuyệt vời!' : 'Chú ý!';

    hopThongBao.innerHTML = `
        <i class="fas ${iconClass}" style="color: ${mauSac}; font-size: 60px; margin-bottom: 20px;"></i>
        <h3 style="margin-bottom: 10px; color: #333; font-size: 24px;">${tieuDe}</h3>
        <p style="color: #666; line-height: 1.6; margin-bottom: 25px; font-size: 16px;">${loiNhan}</p>
        <button id="btn-dong-popup" style="background: ${mauSac}; color: white; border: none; padding: 12px 40px; border-radius: 30px; font-size: 16px; cursor: pointer; font-weight: bold; box-shadow: 0 5px 15px rgba(0,0,0,0.15); transition: 0.2s;">Đồng ý</button>
    `;

    nenMo.appendChild(hopThongBao);
    document.body.appendChild(nenMo);

    setTimeout(() => { nenMo.style.opacity = '1'; hopThongBao.style.transform = 'translateY(0)'; }, 10);

    document.getElementById('btn-dong-popup').addEventListener('click', function() {
        if (typeof hanhDongTiepTheo === 'function') {
            hanhDongTiepTheo();
        } else {
            nenMo.style.opacity = '0';
            hopThongBao.style.transform = 'translateY(-50px)';
            setTimeout(() => { if (document.body.contains(nenMo)) document.body.removeChild(nenMo); }, 300);
        }
    });
};

// ==========================================
// KHI GIAO DIỆN LOAD XONG 100% -> BẮT ĐẦU CHẠY TẤT CẢ JS
// ==========================================
document.addEventListener("DOMContentLoaded", function() {

    // 1. DATABASE SẢN PHẨM
    const dbSanPham = {
        "iPhone 15 Pro Max 256GB": { manHinh: "6.7 inch, Super Retina XDR OLED", cpu: "Apple A17 Pro", ram: "8 GB", boNho: "256 GB", camera: "Chính 48 MP", hdh: "iOS 17", pin: "4422 mAh, Sạc nhanh 20W", chatLieu: "Khung Titan", baiViet: "iPhone 15 Pro Max là bước ngoặt thiết kế của Apple với khung Titan chuẩn hàng không vũ trụ." },
        "iPhone 15 128GB": { manHinh: "6.1 inch, Super Retina XDR OLED", cpu: "Apple A16 Bionic", ram: "6 GB", boNho: "128 GB", camera: "Chính 48 MP", hdh: "iOS 17", pin: "3349 mAh, Sạc 20W", chatLieu: "Khung Nhôm", baiViet: "iPhone 15 tiêu chuẩn năm nay đã được trang bị Dynamic Island vô cùng tiện dụng." },
        "iPhone 14 Plus 128GB": { manHinh: "6.7 inch, Super Retina XDR OLED", cpu: "Apple A15 Bionic", ram: "6 GB", boNho: "128 GB", camera: "Kép 12 MP", hdh: "iOS 16", pin: "4325 mAh, Sạc nhanh 20W", chatLieu: "Khung Nhôm", baiViet: "iPhone 14 Plus có thời lượng pin 'trâu' bậc nhất mà Apple từng sản xuất." },
        "iPhone 13 128GB": { manHinh: "6.1 inch, Super Retina XDR OLED", cpu: "Apple A15 Bionic", ram: "4 GB", boNho: "128 GB", camera: "Kép 12 MP", hdh: "iOS 15", pin: "3240 mAh, Sạc nhanh 20W", chatLieu: "Khung Nhôm", baiViet: "iPhone 13 là mẫu điện thoại 'quốc dân' đáng mua nhất ở thời điểm hiện tại." },
        "MacBook Pro 15 inch 2018": { manHinh: "15.4 inch, Retina", cpu: "Intel Core i7", ram: "16 GB", boNho: "512 GB SSD", camera: "720p HD", hdh: "macOS", pin: "Khoảng 10 giờ", chatLieu: "Vỏ nhôm", baiViet: "MacBook Pro 15 inch 2018 mang lại không gian làm việc rộng rãi." },
        "MacBook Pro 16 inch 2019": { manHinh: "16 inch, Retina", cpu: "Intel Core i7", ram: "16 GB", boNho: "512 GB SSD", camera: "720p HD", hdh: "macOS", pin: "Khoảng 11 giờ", chatLieu: "Vỏ nhôm", baiViet: "MacBook Pro 16 inch 2019 với bàn phím Magic Keyboard gõ cực êm." },
        "MacBook Air M1 2020": { manHinh: "13.3 inch, Retina", cpu: "Apple M1", ram: "8 GB", boNho: "256 GB SSD", camera: "720p HD", hdh: "macOS", pin: "Lên đến 15 giờ", chatLieu: "Vỏ nhôm", baiViet: "MacBook Air M1 là chiếc laptop quốc dân! Pin trâu bò dùng cả ngày không cần sạc." },
        "MacBook Air M2 2022": { manHinh: "13.6 inch, Liquid Retina", cpu: "Apple M2", ram: "8 GB", boNho: "256 GB SSD", camera: "1080p HD", hdh: "macOS", pin: "Lên đến 18 giờ", chatLieu: "Vỏ nhôm", baiViet: "MacBook Air M2 mang ngôn ngữ thiết kế mới vuông vức và hiện đại hơn." },
        "Mac Mini M2 2023": { manHinh: "Không có", cpu: "Apple M2", ram: "8 GB", boNho: "256 GB SSD", camera: "Không", hdh: "macOS", pin: "Cắm điện trực tiếp", chatLieu: "Vỏ nhôm", baiViet: "Mac Mini M2 là chiếc PC để bàn nhỏ gọn nhất nhưng chứa đựng sức mạnh kinh ngạc." },
        "iMac 24 inch M3": { manHinh: "24 inch, 4.5K Retina", cpu: "Apple M3", ram: "8 GB", boNho: "256 GB SSD", camera: "1080p HD", hdh: "macOS", pin: "Cắm điện trực tiếp", chatLieu: "Khung nhôm", baiViet: "iMac 24 inch M3 không chỉ là máy tính mà còn là món đồ trang trí tuyệt đẹp." },
        "Apple Watch Series 9": { manHinh: "OLED Always-On", cpu: "Apple S9", ram: "1 GB", boNho: "64 GB", camera: "Không", hdh: "watchOS 10", pin: "Khoảng 18 giờ", chatLieu: "Nhôm", baiViet: "Apple Watch Series 9 tỏa sáng với vi xử lý S9 cực kỳ mạnh mẽ." },
        "AirPods Pro Gen 2": { manHinh: "Không", cpu: "Apple H2", ram: "Không", boNho: "Không", camera: "Không", hdh: "Tương thích iOS/macOS", pin: "Tai nghe 6h, Hộp sạc 30h", chatLieu: "Nhựa", baiViet: "AirPods Pro Gen 2 là đỉnh cao của công nghệ âm thanh chống ồn." },
        "Sạc Apple 20W": { manHinh: "Không", cpu: "Không", ram: "Không", boNho: "Không", camera: "Không", hdh: "Tương thích mọi thiết bị", pin: "Đầu ra 20W", chatLieu: "Nhựa", baiViet: "Củ sạc chuẩn 20W chính hãng từ Apple giúp sạc nhanh 50% pin trong 30 phút." },
        "default": { manHinh: "Đang cập nhật", cpu: "Đang cập nhật", ram: "Đang cập nhật", boNho: "Đang cập nhật", camera: "Đang cập nhật", hdh: "Đang cập nhật", pin: "Đang cập nhật", chatLieu: "Đang cập nhật", baiViet: "Sản phẩm chính hãng Apple với thiết kế tinh tế và hiệu năng mạnh mẽ." }
    };

    // 2. KHỞI TẠO GIỎ HÀNG CHUNG
    let gioHang = [];
    try { gioHang = JSON.parse(localStorage.getItem('danhSachGioHang')) || []; } catch(e){}

    function capNhatMenuGioHang() {
        const cartText = document.querySelector('.cart-text');
        if (cartText) cartText.innerText = `Giỏ hàng (${gioHang.length})`;
    }
    capNhatMenuGioHang();

    // 3. TÌM KIẾM & LỌC TRANG CHỦ
    const oTimKiem = document.querySelector('.search-box input');
    const nutTimKiem = document.querySelector('.search-box button');
    const cacNutLoc = document.querySelectorAll('.filter-btn');
    const cacSanPham = document.querySelectorAll('.product-item');

    function thucHienTimKiem() {
        if(!oTimKiem) return;
        const tuKhoa = oTimKiem.value.toLowerCase().trim();
        cacSanPham.forEach(sp => {
            const h3 = sp.querySelector('h3');
            if (h3) {
                if (h3.innerText.toLowerCase().includes(tuKhoa)) sp.style.display = 'block';
                else sp.style.display = 'none';
            }
        });
        if (tuKhoa !== '') cacNutLoc.forEach(n => n.classList.remove('active'));
        else if(cacNutLoc.length > 0) cacNutLoc[0].classList.add('active');
    }
    if (oTimKiem) oTimKiem.addEventListener('input', thucHienTimKiem);
    if (nutTimKiem) nutTimKiem.addEventListener('click', thucHienTimKiem);

    cacNutLoc.forEach(nut => {
        nut.addEventListener('click', function() {
            if(oTimKiem) oTimKiem.value = '';
            cacNutLoc.forEach(n => n.classList.remove('active'));
            nut.classList.add('active');
            const danhMuc = nut.getAttribute('data-filter');
            cacSanPham.forEach(sp => {
                if (danhMuc === 'all' || sp.getAttribute('data-category') === danhMuc) sp.style.display = 'block';
                else sp.style.display = 'none';
            });
        });
    });

    // 4. CLICK VÀO SẢN PHẨM TRANG CHỦ
    cacSanPham.forEach(item => {
        const hinhAnh = item.querySelector('img');
        const tieuDe = item.querySelector('h3');
        const nutThem = item.querySelector('.cart-icon-btn');

        const chuyenTrangChiTiet = function() {
            if (nutThem) {
                const ten = nutThem.getAttribute('data-name');
                const gia = nutThem.getAttribute('data-price');
                const hinh = nutThem.getAttribute('data-img');
                localStorage.setItem('sanPhamDangXem', JSON.stringify({ ten, gia, hinh }));
                window.location.href = 'detail.html';
            }
        };

        if (hinhAnh) { hinhAnh.addEventListener('click', chuyenTrangChiTiet); hinhAnh.style.cursor = 'pointer'; }
        if (tieuDe) { tieuDe.addEventListener('click', chuyenTrangChiTiet); tieuDe.style.cursor = 'pointer'; }

        if (nutThem) {
            nutThem.addEventListener('click', function(e) {
                e.stopPropagation(); // Ngăn lỗi xuyên thủng thẻ click
                const ten = nutThem.getAttribute('data-name');
                const gia = parseInt(nutThem.getAttribute('data-price'));
                const hinh = nutThem.getAttribute('data-img');
                gioHang.push({ ten, gia, hinh });
                localStorage.setItem('danhSachGioHang', JSON.stringify(gioHang));
                capNhatMenuGioHang();
                window.thongBaoXinXo(`Đã thêm <b>${ten}</b> vào giỏ hàng!`, true);
            });
        }
    });

    // 5. HIỂN THỊ DỮ LIỆU Ở TRANG CHI TIẾT (detail.html)
    const trangChiTietName = document.getElementById('detail-name');
    if (trangChiTietName) {
        const sp = JSON.parse(localStorage.getItem('sanPhamDangXem'));
        if (sp) {
            document.getElementById('detail-name').innerText = sp.ten;
            const imgEl = document.getElementById('detail-img'); if(imgEl) imgEl.src = sp.hinh;
            const aImg = document.getElementById('article-img'); if(aImg) aImg.src = sp.hinh;
            const bc = document.getElementById('detail-breadcrumb'); if(bc) bc.innerText = sp.ten;

            let giaMoi = parseInt(sp.gia);
            let giaCu = giaMoi + (giaMoi * 0.15);
            const pNew = document.getElementById('detail-price'); if(pNew) pNew.innerText = giaMoi.toLocaleString('vi-VN') + ' đ';
            const pOld = document.getElementById('detail-old-price'); if(pOld) pOld.innerText = giaCu.toLocaleString('vi-VN') + ' đ';

            let dl = dbSanPham["default"];
            for (let key in dbSanPham) { if (sp.ten.includes(key)) { dl = dbSanPham[key]; break; } }

            const fMap = { 'spec-screen': dl.manHinh, 'spec-cpu': dl.cpu, 'spec-ram': dl.ram, 'spec-storage': dl.boNho, 'spec-cam': dl.camera, 'spec-os': dl.hdh, 'spec-pin': dl.pin, 'spec-mat': dl.chatLieu, 'article-text': dl.baiViet };
            for(let id in fMap) { let el = document.getElementById(id); if(el) el.innerText = fMap[id]; }

            const btnAdd = document.getElementById('btn-add-detail');
            if(btnAdd) {
                btnAdd.addEventListener('click', function() {
                    gioHang.push({ ten: sp.ten, gia: giaMoi, hinh: sp.hinh });
                    localStorage.setItem('danhSachGioHang', JSON.stringify(gioHang));
                    capNhatMenuGioHang();
                    window.thongBaoXinXo(`Đã thêm <b>${sp.ten}</b> vào giỏ hàng!`, true);
                });
            }
        }
    }

    // 6. XỬ LÝ TRANG GIỎ HÀNG VÀ THANH TOÁN (cart.html)
    function hienThiGioHang() {
        const bang = document.querySelector('.cart-table tbody');
        if (!bang) return;
        if (gioHang.length === 0) {
            bang.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 30px;">Giỏ hàng trống.</td></tr>';
            const tp = document.querySelector('.total-price'); if(tp) tp.innerText = '0 đ';
        } else {
            bang.innerHTML = ''; let tong = 0;
            gioHang.forEach(function(sp, idx) {
                bang.innerHTML += `<tr><td style="display: flex; align-items: center; gap: 15px;"><img src="${sp.hinh}" style="width: 80px; height: auto; border-radius: 5px;"><strong>${sp.ten}</strong></td><td>1</td><td style="color: red; font-weight: bold;">${sp.gia.toLocaleString('vi-VN')} đ</td><td><button class="btn-xoa" onclick="window.xoaSP(${idx})"><i class="fas fa-trash"></i> Xóa</button></td></tr>`;
                tong += sp.gia;
            });
            const tp = document.querySelector('.total-price'); if(tp) tp.innerText = tong.toLocaleString('vi-VN') + ' đ';
        }
    }
    window.xoaSP = function(idx) {
        gioHang.splice(idx, 1);
        localStorage.setItem('danhSachGioHang', JSON.stringify(gioHang));
        hienThiGioHang(); capNhatMenuGioHang();
    };
    hienThiGioHang();

    const bThanhToan = document.querySelector('.checkout-btn');
    if (bThanhToan) {
        bThanhToan.addEventListener('click', function() {
            const userHienTai = localStorage.getItem('nguoiDungHienTai');
            if (!userHienTai) { window.thongBaoXinXo('Vui lòng đăng nhập để thanh toán!', false, function() { window.location.href = 'login.html'; }); return; }
            if (gioHang.length === 0) { window.thongBaoXinXo('Giỏ hàng trống!', false); return; }
            let tong = 0; gioHang.forEach(sp => tong += sp.gia);
            const ma = 'DH' + Math.floor(Math.random() * 90000 + 10000);
            const ngay = new Date().toLocaleDateString('vi-VN');
            const don = { maDonHang: ma, ngay: ngay, sanPham: gioHang, tongTien: tong, trangThai: 'Đang xử lý' };
            let ls = JSON.parse(localStorage.getItem('donHang_' + userHienTai)) || [];
            ls.push(don); localStorage.setItem('donHang_' + userHienTai, JSON.stringify(ls));
            window.thongBaoXinXo(`Đặt hàng thành công.<br>Mã đơn: <b>${ma}</b>`, true, function() {
                localStorage.removeItem('danhSachGioHang'); window.location.href = 'profile.html';
            });
        });
    }

    // 7. XỬ LÝ HEADER USER (Hiển thị tên & nút Đăng xuất trên thanh menu MỌI TRANG)
    const nguoiDung = localStorage.getItem('nguoiDungHienTai');
    if (nguoiDung) {
        const bIn = document.getElementById('btn-dang-nhap'); if(bIn) bIn.style.display = 'none';
        const sName = document.getElementById('ten-nguoi-dung');
        if (sName) {
            sName.innerHTML = `<a href="profile.html" style="color: white; text-decoration: none; background: rgba(255,255,255,0.2); padding: 6px 15px; border-radius: 20px; transition: 0.3s; display: flex; align-items: center; gap: 8px;"><img src="https://ui-avatars.com/api/?name=${nguoiDung}&background=fff&color=009FE3&rounded=true&bold=true" style="width: 24px; height: 24px; border-radius: 50%;"><span>Chào, <b>${nguoiDung}</b></span></a>`;
            sName.style.display = 'inline-block';
        }
        const bOut = document.getElementById('btn-dang-xuat');
        if (bOut) {
            bOut.style.display = 'inline';
            bOut.addEventListener('click', function(e) {
                e.preventDefault(); localStorage.removeItem('nguoiDungHienTai');
                window.thongBaoXinXo('Bạn đã đăng xuất!', true, function() { window.location.href = 'index.html'; });
            });
        }
    }

    // 8. XỬ LÝ DỮ LIỆU Ở TRANG PROFILE (profile.html)
    const pPage = document.getElementById('profile-username');
    if (pPage) {
        if (!nguoiDung) window.location.href = 'login.html';
        else {
            const dl = localStorage.getItem('user_' + nguoiDung);
            let email = "Chưa cập nhật", phone = "Chưa cập nhật", mkCu = "";
            if (dl) { try { const tk = JSON.parse(dl); if(tk.email) email=tk.email; if(tk.soDienThoai) phone=tk.soDienThoai; if(tk.matKhau) mkCu=tk.matKhau; } catch(e){} }
            
            pPage.value = nguoiDung;
            const psn = document.getElementById('profile-sidebar-name'); if(psn) psn.innerText = nguoiDung;
            const pe = document.getElementById('profile-email'); if(pe) pe.value = email;
            const pp = document.getElementById('profile-phone'); if(pp) pp.value = phone;
            const pa = document.getElementById('profile-avatar'); if(pa) pa.src = `https://ui-avatars.com/api/?name=${nguoiDung}&background=009FE3&color=fff&size=200&bold=true`;

            // Menu Profile
            const menus = [document.getElementById('menu-ho-so'), document.getElementById('menu-don-hang'), document.getElementById('menu-thong-bao'), document.getElementById('menu-doi-mk')].filter(m=>m);
            const tabs = [document.getElementById('tab-ho-so'), document.getElementById('tab-don-hang'), document.getElementById('tab-thong-bao'), document.getElementById('tab-doi-mk')].filter(t=>t);
            menus.forEach((m, i) => {
                m.addEventListener('click', () => {
                    menus.forEach(mx => mx.classList.remove('active')); m.classList.add('active');
                    tabs.forEach(tx => tx.style.display = 'none'); if(tabs[i]) tabs[i].style.display = 'block';
                });
            });

            // Lịch sử đơn hàng
            let ls = JSON.parse(localStorage.getItem('donHang_' + nguoiDung)) || [];
            const cDH = document.getElementById('count-don-hang'); if(cDH) cDH.innerText = ls.length;
            const dsDH = document.getElementById('danh-sach-don-hang');
            if(dsDH) {
                if (ls.length === 0) dsDH.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Chưa có đơn hàng nào.</p>';
                else {
                    ls.slice().reverse().forEach(don => {
                        let htmlSP = don.sanPham.map(sp => `<div style="display:flex; gap:15px; margin-bottom:10px;"><img src="${sp.hinh}" style="width:50px; border-radius:5px;"><div><p style="font-weight:bold; font-size:14px; margin:0;">${sp.ten}</p><p style="color:#e5002d; font-size:13px; margin:0;">${sp.gia.toLocaleString('vi-VN')} đ</p></div></div>`).join('');
                        dsDH.innerHTML += `<div style="border:1px solid #eee; border-radius:10px; padding:20px; margin-bottom:20px;"><div style="display:flex; justify-content:space-between; border-bottom:1px dashed #ccc; padding-bottom:10px; margin-bottom:10px;"><span>Mã ĐH: <strong>${don.maDonHang}</strong></span><span>${don.ngay}</span><span style="color:#009FE3; font-weight:bold;">${don.trangThai}</span></div>${htmlSP}<div style="text-align:right; border-top:1px solid #eee; padding-top:10px; margin-top:10px;">Tổng tiền: <strong style="color:#e5002d; font-size:18px;">${don.tongTien.toLocaleString('vi-VN')} đ</strong></div></div>`;
                    });
                }
            }

            // Đổi MK
            const bLuuMk = document.getElementById('btn-luu-mk');
            if(bLuuMk) {
                bLuuMk.addEventListener('click', function() {
                    const m1=document.getElementById('mk-cu').value, m2=document.getElementById('mk-moi').value, m3=document.getElementById('mk-moi-lai').value;
                    if(m1 !== mkCu) { window.thongBaoXinXo('Mật khẩu cũ sai!', false); return; }
                    if(m2.length < 5) { window.thongBaoXinXo('Mật khẩu mới quá ngắn!', false); return; }
                    if(m2 !== m3) { window.thongBaoXinXo('Mật khẩu nhập lại không khớp!', false); return; }
                    localStorage.setItem('user_'+nguoiDung, JSON.stringify({matKhau: m2, email, soDienThoai: phone}));
                    window.thongBaoXinXo('Đổi MK thành công!', true, function(){ localStorage.removeItem('nguoiDungHienTai'); window.location.href='login.html'; });
                });
            }

            // Nút đăng xuất trong menu profile
            const bOutProf = document.getElementById('menu-dang-xuat');
            if(bOutProf) bOutProf.addEventListener('click', function() { localStorage.removeItem('nguoiDungHienTai'); window.location.href = 'index.html'; });
        }
    }
});