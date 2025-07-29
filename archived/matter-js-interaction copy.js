window.onload = function () {

    // variable definition
    // Flying image in Graduation project defense section
    const container = document.getElementById('flyingContainer');

    var InfiniteLoadingWidth; // horizontal radius (x-axis)
    if (window.innerWidth < 500) {
        InfiniteLoadingWidth = 550;
    }
    else {
        InfiniteLoadingWidth = window.innerWidth * 0.8 / 2;
    };
    var InfiniteLoadingHeight = container.getBoundingClientRect().height / 2 - 40; // vertical radius (y-axis)
    var centerX = container.getBoundingClientRect().width / 2;
    var centerY = container.getBoundingClientRect().height / 2;

    var randomFallingImg = 0;

    function getRandomImages(arr, count) {
        // Create a shallow copy of the array to avoid modifying the original
        const shuffled = [...arr];
        const result = [];
        let i = arr.length;
        let randomIndex;

        // Ensure the count does not exceed the array's length
        const actualCount = Math.min(count, arr.length);

        // While there are elements to shuffle and we haven't reached the desired count
        while (actualCount > 0 && i > 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * i--);

            // Add it to the result array
            result.push(shuffled[randomIndex]);

            // Swap it with the current element to ensure it's not picked again
            [shuffled[randomIndex], shuffled[i]] = [shuffled[i], shuffled[randomIndex]];

            // Decrement the count of items needed
            if (result.length === actualCount) {
                break; // Stop once we have enough items
            }
        }

        return result;
    }

    const imageGraduationUrls = [
        'asset/image/graduation/1.png',
        'asset/image/graduation/2.png',
        'asset/image/graduation/3.png',
        'asset/image/graduation/4.png',
        'asset/image/graduation/5.png',
        'asset/image/graduation/6.png',
        'asset/image/graduation/7.png',
        'asset/image/graduation/8.png',
        'asset/image/graduation/9.png',
        'asset/image/graduation/10.png',
        'asset/image/graduation/11.png',
        'asset/image/graduation/12.png',
        'asset/image/graduation/13.png',
        'asset/image/graduation/14.png',
        'asset/image/graduation/15.png',
        'asset/image/graduation/16.png',
        'asset/image/graduation/17.png',
        'asset/image/graduation/18.png',
        'asset/image/graduation/19.png',
        'asset/image/graduation/20.png',
        'asset/image/graduation/21.png',
        'asset/image/graduation/22.png',
        'asset/image/graduation/23.png',
        'asset/image/graduation/24.png',
        'asset/image/graduation/25.png',
        'asset/image/graduation/26.png',
        'asset/image/graduation/27.png',
        'asset/image/graduation/28.png',
        'asset/image/graduation/29.png',
        'asset/image/graduation/30.png',
        'asset/image/graduation/31.png',
        'asset/image/graduation/32.png',
        'asset/image/graduation/33.png',
        'asset/image/graduation/34.png',
        'asset/image/graduation/35.png',
        'asset/image/graduation/36.png',
        'asset/image/graduation/37.png',
        'asset/image/graduation/38.png',
        'asset/image/graduation/39.png',
        'asset/image/graduation/40.png',
        'asset/image/graduation/41.png',
        'asset/image/graduation/42.png',
        'asset/image/graduation/43.png',
        'asset/image/graduation/44.png',
        'asset/image/graduation/45.png',
        'asset/image/graduation/46.png',
        'asset/image/graduation/47.png',
        'asset/image/graduation/48.png',
        'asset/image/graduation/49.png',
        'asset/image/graduation/50.png',
        'asset/image/graduation/51.png',
        'asset/image/graduation/52.png',
        'asset/image/graduation/53.png',
        'asset/image/graduation/54.png',
        'asset/image/graduation/55.png',
        'asset/image/graduation/56.png',
        'asset/image/graduation/57.png',
        'asset/image/graduation/58.png',
        'asset/image/graduation/59.png',
        'asset/image/graduation/60.png',
        'asset/image/graduation/61.png',
        'asset/image/graduation/62.png',
        'asset/image/graduation/63.png',
        'asset/image/graduation/64.png',
        'asset/image/graduation/65.png',
        'asset/image/graduation/66.png',
        'asset/image/graduation/67.png',
        'asset/image/graduation/68.png',
        'asset/image/graduation/69.png',
        'asset/image/graduation/70.png',
        'asset/image/graduation/71.png',
        'asset/image/graduation/72.png',
        'asset/image/graduation/73.png',
        'asset/image/graduation/74.png',
        'asset/image/graduation/75.png',
        'asset/image/graduation/76.png',
        'asset/image/graduation/77.png',
        'asset/image/graduation/78.png',
        'asset/image/graduation/79.png',
        'asset/image/graduation/80.png',
        'asset/image/graduation/81.png',
        'asset/image/graduation/82.png',
        'asset/image/graduation/83.png',
        'asset/image/graduation/84.png',
        'asset/image/graduation/85.png',
        'asset/image/graduation/86.png',
        'asset/image/graduation/87.png',
        'asset/image/graduation/88.png',
        'asset/image/graduation/89.png',
        'asset/image/graduation/90.png',
        'asset/image/graduation/91.png',
        'asset/image/graduation/92.png',
        'asset/image/graduation/93.png',
        'asset/image/graduation/94.png',
        'asset/image/graduation/95.png',
        'asset/image/graduation/96.png',
        'asset/image/graduation/97.png',
        'asset/image/graduation/98.png',
        'asset/image/graduation/99.png',
        'asset/image/graduation/100.png',
        'asset/image/graduation/101.png',
        'asset/image/graduation/102.png',
        'asset/image/graduation/103.png',
        'asset/image/graduation/104.png',
        'asset/image/graduation/105.png',
        'asset/image/graduation/106.png',
        'asset/image/graduation/107.png',
        'asset/image/graduation/108.png',
        'asset/image/graduation/109.png',
        'asset/image/graduation/110.png',
        'asset/image/graduation/111.png',
        'asset/image/graduation/112.png'
    ];

    const imageBootcampUrls = [
        'asset/image/bootcamp-img/bootcamp-1.png',
        'asset/image/bootcamp-img/bootcamp-2.png',
        'asset/image/bootcamp-img/bootcamp-3.png',
        'asset/image/bootcamp-img/bootcamp-4.png',
        'asset/image/bootcamp-img/bootcamp-5.png',
        'asset/image/bootcamp-img/bootcamp-6.png',
        'asset/image/bootcamp-img/bootcamp-7.png',
        'asset/image/bootcamp-img/bootcamp-8.png',
        'asset/image/bootcamp-img/bootcamp-9.png',
        'asset/image/bootcamp-img/bootcamp-10.png',
        'asset/image/bootcamp-img/bootcamp-11.png',
        'asset/image/bootcamp-img/bootcamp-12.png'
    ];

    const imageParticipantUrls = [
        "asset/image/participant/aDat.png",
        "asset/image/participant/CongHiep.png",
        "asset/image/participant/DoanNgocThach.png",
        "asset/image/participant/DoHuongQuynh.png",
        "asset/image/participant/DucHai.png",
        "asset/image/participant/DucHanh.png",
        "asset/image/participant/HaiAnh.png",
        "asset/image/participant/HaiBac.png",
        "asset/image/participant/HaiLong.png",
        "asset/image/participant/HoangDam.png",
        "asset/image/participant/HoangNhung.png",
        "asset/image/participant/HongDam.png",
        "asset/image/participant/HungPham.png",
        "asset/image/participant/Huong.png",
        "asset/image/participant/HuyenThuong.png",
        "asset/image/participant/IvyHua.png",
        "asset/image/participant/KimChi.png",
        "asset/image/participant/Lan.png",
        "asset/image/participant/LanNguyen.png",
        "asset/image/participant/LeBach.png",
        "asset/image/participant/MinhGiang.png",
        "asset/image/participant/MinhLe.png",
        "asset/image/participant/MinhQuan.png",
        "asset/image/participant/ThanhHa.png",
        "asset/image/participant/Nam.png",
        "asset/image/participant/Ngan.png",
        "asset/image/participant/NgocXuyen.png",
        "asset/image/participant/NguyenDuyDat.png",
        "asset/image/participant/NguyenNgocTu.png",
        "asset/image/participant/NguyenPhanLinhChi.png",
        "asset/image/participant/NguyenPhuongHa.png",
        "asset/image/participant/NguyenTienThanh.png",
        "asset/image/participant/NguyenTrungThanh.png",
        "asset/image/participant/Nhung.png",
        "asset/image/participant/Phuong.png",
        "asset/image/participant/PhuongMai.png",
        "asset/image/participant/Quynh.png",
        "asset/image/participant/SonTruongGiang.png",
        "asset/image/participant/TamMinh.png",
        "asset/image/participant/TaQuangDat.png",
        "asset/image/participant/ThanhLuan.png",
        "asset/image/participant/Thao.png",
        "asset/image/participant/TheHai.png",
        "asset/image/participant/Thinh.png",
        "asset/image/participant/Thu.png",
        "asset/image/participant/ThuHa.png",
        "asset/image/participant/ThuongHuyen.png",
        "asset/image/participant/ThuyTien.png",
        "asset/image/participant/Tram.png",
        "asset/image/participant/TramAnh.png",
        "asset/image/participant/TrangTran.png",
        "asset/image/participant/TranHanh.png",
        "asset/image/participant/TranKhanhLinh.png",
        "asset/image/participant/TruongThuHuong.png",
        "asset/image/participant/VietHa.png",
        "asset/image/participant/VuCaoCuong.png",
        "asset/image/participant/VuHaiAnh.png",
        "asset/image/participant/XuanAnh.png"
    ];

    var imageUrlsWithDimension = [
        {
            "url": "asset/image/graduation/1.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/2.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/3.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/4.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/5.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/6.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/7.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/8.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/9.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/10.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/11.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/12.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/13.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/14.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/15.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/16.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/17.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/18.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/19.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/20.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/21.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/22.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/23.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/24.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/25.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/26.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/27.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/28.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/29.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/30.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/31.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/32.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/33.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/34.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/35.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/36.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/37.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/38.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/39.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/40.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/41.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/42.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/43.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/44.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/45.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/46.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/47.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/48.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/49.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/50.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/51.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/52.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/53.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/54.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/55.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/56.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/57.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/58.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/59.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/60.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/61.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/62.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/63.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/64.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/65.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/66.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/67.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/68.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/69.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/70.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/71.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/72.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/73.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/74.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/75.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/76.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/77.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/78.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/79.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/80.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/81.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/82.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/83.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/84.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/85.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/86.png",
            "width": 301,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/87.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/88.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/89.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/90.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/91.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/92.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/93.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/94.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/95.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/96.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/97.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/98.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/99.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/100.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/101.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/102.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/103.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/104.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/105.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/106.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/107.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/108.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/109.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/110.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/111.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/graduation/112.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/aDat.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/CongHiep.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/DoanNgocThach.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/DoHuongQuynh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/DucHai.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/DucHanh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/HaiAnh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/HaiBac.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/HaiLong.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/HoangDam.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/HoangNhung.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/HongDam.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/HungPham.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Huong.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/HuyenThuong.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/IvyHua.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/KimChi.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Lan.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/LanNguyen.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/LeBach.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/MinhGiang.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/MinhLe.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/MinhQuan.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/ThanhHa.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Nam.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Ngan.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/NgocXuyen.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/NguyenDuyDat.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/NguyenNgocTu.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/NguyenPhanLinhChi.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/NguyenPhuongHa.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/NguyenTienThanh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/NguyenTrungThanh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Nhung.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Phuong.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/PhuongMai.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Quynh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/SonTruongGiang.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/TamMinh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/TaQuangDat.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/ThanhLuan.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Thao.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/TheHai.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Thinh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Thu.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/ThuHa.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/ThuongHuyen.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/ThuyTien.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/Tram.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/TramAnh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/TrangTran.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/TranHanh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/TranKhanhLinh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/TruongThuHuong.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/VietHa.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/VuCaoCuong.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/VuHaiAnh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/participant/XuanAnh.png",
            "width": 300,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-1.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-2.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-3.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-4.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-5.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-6.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-7.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-8.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-9.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-10.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-11.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        },
        {
            "url": "asset/image/bootcamp-img/bootcamp-12.png",
            "width": 405,
            "height": 300,
            "shape": "rect"
        }
    ];

    // =============================================================================================

    // Đoạn code chạy để lấy kích thước width height của ảnh.
    const imageUrls = imageGraduationUrls.concat(imageParticipantUrls).concat(imageBootcampUrls);

    async function loadImagesInfo(urls) {
        console.log(1);
        const promises = urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        url: url,
                        width: img.width,
                        height: img.height,
                        shape: 'rect'
                    });
                    console.log(1);
                };
                img.onerror = () => {
                    console.warn(`Failed to load image: ${url}`);
                    resolve(null); // Hoặc reject nếu muốn bỏ qua ảnh lỗi
                };
                img.src = url;

            });
        });
        const results = await Promise.all(promises);
        return results.filter(item => item !== null); // Loại bỏ ảnh bị lỗi nếu có
    }

    loadImagesInfo(imageUrls).then(imageInfos => {
        // imageUrlsWithDimension = imageInfos;
        console.log(imageInfos);

    });

    // =============================================================================================


    const {
        Engine,
        Render,
        Runner,
        World,
        Bodies,
        Body,
        Composite,
        Mouse,
        MouseConstraint,
        Query
    } = Matter;
    const runner = Matter.Runner.create();

    const canvas = document.getElementById('interactiveImage');

    canvas.style.opacity = 1;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const width = canvas.width;
    const height = canvas.height * 2;

    const engine = Engine.create();
    engine.world.gravity.y = -0.8;
    engine.world.gravity.x = 0;

    const world = engine.world;

    const render = Render.create({
        engine: engine,
        canvas: canvas,
        options: {
            width: width,
            height: height,
            pixelRatio: window.devicePixelRatio,  // <-- Add this
            // disable debug lines to show images only
            wireframes: false,
        }
    });

    Render.run(render);
    Runner.run(Runner.create(), engine);
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;


    var scaleFactor;

    if (window.innerWidth < 500) { scaleFactor = 0.2; } else { scaleFactor = 0.35; }


    // if mobile size
    if (width < 500) {
        fallingImg = getRandomImages(imageUrlsWithDimension, 70);
    }
    // if desktop size
    else {
        fallingImg = getRandomImages(imageUrlsWithDimension, 160);
    }

    const bodies = [];

    function isAreaFree(x, y, w, h) {
        const region = {
            min: { x: x - w / 2, y: y - h / 2 },
            max: { x: x + w / 2, y: y + h / 2 }
        };
        return Query.region(Composite.allBodies(world), region).length === 0;
    }

    function createImageBody(x, y, image) {
        return Bodies.rectangle(x, y, image.width * scaleFactor + 10, image.height * scaleFactor + 10, {
            url: 'test',
            title: 'test',
            imgtype: 'bootcamp-cover',
            inertia: 1000000,
            restitution: 0.1,
            friction: 0.4,
            frictionAir: 0.01,
            angle: 0.2 - Math.random() * 0.4, // slight tilt
            render: {
                sprite: {
                    texture: image.url,
                    xScale: scaleFactor,
                    yScale: scaleFactor
                }
            }
        });
    }

    let tries = 0;
    while (bodies.length < fallingImg.length && tries < 1000) {

        // Tọa độ X Y bắt đầu rơi
        // const x = width * Math.random(); // * (0.4 + Math.random() / 5);
        // const y = height * (0.5 + Math.random() / 2);
        const x = width / 2; // * (0.4 + Math.random() / 5);
        const y = height / 4;
        if (isAreaFree(x, y, 400 * scaleFactor, 400 * scaleFactor)) {
            const body = createImageBody(x, y, fallingImg[bodies.length]);

            // Body.scale(body, 10, 10);
            // body.render.sprite.xScale *= 10;
            // body.render.sprite.yScale *= 10;

            bodies.push(body);
        }
        tries++;
    }

    World.add(world, [
        // Bottom -----------
        // Bodies.rectangle(width / 2, height + 1, width, 1, {
        //     isStatic: true,
        //     render: {
        //         fillStyle: 'transparent',
        //         strokeStyle: 'transparent',
        //         lineWidth: 0,
        //     }
        // }),
        // Top --------
        Bodies.rectangle(width / 2, 5, width, 1, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
                strokeStyle: 'transparent',
                lineWidth: 0,
            }
        }),
        // Left -------------------
        Bodies.rectangle(5, height / 2, 1, height, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
                strokeStyle: 'transparent',
                lineWidth: 0,
            }
        }),
        // Right -------------------
        Bodies.rectangle(width - 5, height / 2, 1, height, {
            isStatic: true,
            render: {
                fillStyle: 'transparent',
                strokeStyle: 'transparent',
                lineWidth: 0,
            }
        })
    ]);


    World.add(world, bodies);

    const mouse = Matter.Mouse.create(render.canvas);
    mouse.pixelRatio = window.devicePixelRatio;  // <- this is the fix

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        element: document.body,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Matter.World.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    render.canvas.addEventListener('mousedown', function (event) {

        const { x, y } = mouse.position;

        // Use Matter.Query.point to find which body is under the mouse
        const bodiesAtPoint = Query.point(Composite.allBodies(engine.world), { x, y });

        if (bodiesAtPoint.length > 0) {
            console.log("Clicked on body:", bodiesAtPoint[0].url);

            // Body.scale(bodiesAtPoint[0], 1.2, 1.2);
            // bodiesAtPoint[0].render.sprite.xScale *= 1.2;
            // bodiesAtPoint[0].render.sprite.yScale *= 1.2;

        } else {

            console.log("Clicked on empty space.");
            // if (isAreaFree(x, y, 400 * scaleFactor, 400 * scaleFactor)) {
            if (randomFallingImg < fallingImg.length - 1) { randomFallingImg++ }
            else {
                randomFallingImg = 0;
            };
            const img = fallingImg[randomFallingImg];
            const body = createImageBody(x, y, img);
            World.add(world, body);
            // }
        }
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {

        InfiniteLoadingWidth = window.innerWidth * 0.8 / 2; // horizontal radius (x-axis)
        InfiniteLoadingHeight = container.getBoundingClientRect().height / 2 - 40; // vertical radius (y-axis)
        centerX = container.getBoundingClientRect().width / 2;
        centerY = container.getBoundingClientRect().height / 2;

        // Clear any existing timeout to reset the timer
        clearTimeout(resizeTimeout);

        // Set a new timeout
        resizeTimeout = setTimeout(() => {
            // This function will execute only after the user stops resizing for 200ms
            handleResizeEnd();
        }, 50); // Adjust the delay (in milliseconds) as needed
    });

    function handleResizeEnd() {
        // location.reload();
        // window.innerWidth <= canvas.width ? console.log("cho nhỏ đi") : location.reload();
    }

    // Settings =======================================================================================

    const smallestSize = 1.2;
    const largestSize = 1.2;
    const graduationImgEls = [];

    var speed = 0.00003; // radians per ms


    // =======================================================================================

    // Create image elements
    for (let i = 0; i < imageGraduationUrls.length; i++) {
        const img = document.createElement('img');
        img.src = imageGraduationUrls[i];
        img.className = 'flyer';
        container.appendChild(img);
        graduationImgEls.push({
            el: img,
            angle: (i / imageGraduationUrls.length) * 2 * Math.PI // spread evenly
        });
    }

    // Animate ===================================================================================

    function animate(time) {
        graduationImgEls.forEach(img => {
            img.angle += speed * 16;
            const percentageX = 2 * (mouseX - (container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2)) / window.innerWidth;
            const percentageY = 2 * (mouseY - (container.getBoundingClientRect().top + container.getBoundingClientRect().height / 2)) / window.innerHeight;

            var distance = Math.sqrt(percentageX * percentageX + percentageY * percentageY);
            speed = 0.002 * percentageX / 2 + 0.00003;

            // Position on oval
            const x = centerX + InfiniteLoadingWidth * Math.sin(img.angle);
            const y = centerY + InfiniteLoadingHeight * Math.sin(img.angle) * Math.cos(img.angle) * 2;


            const relativeX = Math.cos(img.angle); // -1 (left) to 1 (right)
            // const scale = smallestSize + largestSize * (2.2 - Math.abs(distance)) * (1 - relativeX); // 0.5 to 1

            const scale = smallestSize + largestSize * (2 - Math.abs(distance)) * Math.abs(relativeX);

            img.el.style.transform = `translate(${x - 15}px, ${y}px) scale(${scale})`;
            // img.el.style.transform = `translate(${centerX - x * Math.sin(img.angle) * Math.cos(img.angle)}px, ${y}px) scale(${scale})`;


        });

        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

};

document.getElementById("interactiveImage").onwheel = function (event) {
    // event.preventDefault();
};

document.getElementById("interactiveImage").onmousewheel = function (event) {
    // event.preventDefault();
};

var mouseX = 0, mouseY = 0;
function getMousePositionOnScreen(e) {
    mouseX = e.x;
    mouseY = e.y;
}
