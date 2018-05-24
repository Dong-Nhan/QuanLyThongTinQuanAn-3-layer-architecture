var url = require('url');
var xmldom = require("xmldom");
var DOMParser = new xmldom.DOMParser();
var XMLSerializer = new xmldom.XMLSerializer();
var DataAccessLayer = require("../DataAccessLayer/DataAccessLayer");

class BussinessLayer {
    constructor() {
        this.chuoiDuLieu; //cache dữ liệu
        this.domDuLieu;
    }
    Doc() {
        //lấy chuỗi xml
        this.chuoiDuLieu = DataAccessLayer.Doc();
        //build XML DOM
        this.domDuLieu = DOMParser.parseFromString(this.chuoiDuLieu);
        let dsQuanAn = this.domDuLieu.getElementsByTagName('QuanAn');
        //tạo giao diện html
        let domGiaoDien = DOMParser.parseFromString(`<div class="row card-deck"></div>`);
        for (let i = 0; i < dsQuanAn.length; i++) {
            let domQuanAn = DOMParser.parseFromString(`
            <div class="col-md-4 my-4">
                <div id="${dsQuanAn[i].getAttribute('maSo')}" class="card">
                    <div class="card-body">
                        <h4 class="card-title">${dsQuanAn[i].getAttribute('ten')}</h4>
                        <h5 class="card-subtitle mb-2 text-muted">${dsQuanAn[i].getAttribute('moTa')}</h5>
                        <h6 class="m-0">Địa chỉ</h6>
                        <div class="mb-2">${dsQuanAn[i].getAttribute('diaChi')}</div>
                        <h6 class="m-0">Số điện thoại</h6>
                        <div class="mb-2">${dsQuanAn[i].getAttribute('sdt')}</div>
                        <button class="btn btn-outline-success" data-id="${dsQuanAn[i].getAttribute('maSo')}" data-toggle="modal" data-target="#modalCapNhatQuanAn">Chỉnh sửa</button>
                        <button class="btn btn-outline-danger" data-id="${dsQuanAn[i].getAttribute('maSo')}" data-toggle="modal" data-target="#modalXoaQuanAn">Xóa</button>
                    </div>
                </div>
            </div>
            `)
            domGiaoDien.documentElement.appendChild(domQuanAn);
        }
        let domNutThem = DOMParser.parseFromString(`
        <div class="col-md-4 my-4">
            <div id="nutThem" class="card h-100">
                <div class="card-body h-100 p-0">
                    <button class="btn btn-light h-100 w-100 text-muted" data-toggle="modal" data-target="#modalThemQuanAn">Thêm</button>
                </div>
            </div>
        </div>`)
        domGiaoDien.documentElement.appendChild(domNutThem);
        return XMLSerializer.serializeToString(domGiaoDien);
    }

    Them(urlQuery) {
        //lấy thông tin query từ url: /Them?data=
        let data = JSON.parse(urlQuery.data);
        //lấy mã số mới
        data.maSo = this.LayMaSoMoi();
        //tạo chuỗi xml cho quán ăn mới
        let xmlQuanAnMoi = `<QuanAn maSo="${data.maSo}" ten="${data.ten}" moTa="${data.moTa}" diaChi="${data.diaChi}" sdt="${data.sdt}"/>`
        //thêm vào DOM
        let domQuanAnMoi = DOMParser.parseFromString(xmlQuanAnMoi);
        this.domDuLieu.documentElement.appendChild(domQuanAnMoi);
        console.log(this.domDuLieu.getElementsByTagName('QuanAn')[4].getAttribute('maSo'));
        //gửi chuỗi xml cho DAL cập nhật
        this.chuoiDuLieu = XMLSerializer.serializeToString(this.domDuLieu);
        DataAccessLayer.Ghi(this.chuoiDuLieu);
        return "true";
    }

    Xoa(urlQuery) {
        //lấy thông tin query từ url: /Xoa?maSo=
        let maSo = urlQuery.maSo;
        //tìm node có mã số cần xóa
        let dsQuanAn = this.domDuLieu.getElementsByTagName('QuanAn');
        for (let i = 0; i < dsQuanAn.length; i++) {
            if (dsQuanAn[i].getAttribute("maSo") == maSo) {
                this.domDuLieu.documentElement.removeChild(dsQuanAn[i]);
                break;
            }
        }
        //gửi chuỗi xml cho DAL cập nhật
        this.chuoiDuLieu = XMLSerializer.serializeToString(this.domDuLieu);
        DataAccessLayer.Ghi(this.chuoiDuLieu);
        return "true";
    }

    CapNhat(urlQuery) {
        //lấy thông tin query từ url: /CapNhat?maSo=&data=
        let maSo = urlQuery.maSo;
        let data = JSON.parse(urlQuery.data);
        //tìm node có mã số cần cập nhật
        let dsQuanAn = this.domDuLieu.getElementsByTagName('QuanAn');
        for (let i = 0; i < dsQuanAn.length; i++) {
            if (dsQuanAn[i].getAttribute("maSo") == maSo) {
                //cập nhật
                dsQuanAn[i].setAttribute('ten', data.ten);
                dsQuanAn[i].setAttribute('moTa', data.moTa);
                dsQuanAn[i].setAttribute('diaChi', data.diaChi);
                dsQuanAn[i].setAttribute('sdt', data.sdt);
                break;
            }
        }
        //gửi chuỗi xml cho DAL cập nhật
        this.chuoiDuLieu = XMLSerializer.serializeToString(this.domDuLieu);
        DataAccessLayer.Ghi(this.chuoiDuLieu);
        return "true";
    }

    LayMaSoMoi() {
        let maSo;
        let dsQuanAn = this.domDuLieu.getElementsByTagName('QuanAn');

        if (dsQuanAn.length == 0) maSo = 1;
        else maSo = parseInt(dsQuanAn[dsQuanAn.length - 1].getAttribute("maSo")) + 1;

        return maSo;
    }
}

module.exports = new BussinessLayer();