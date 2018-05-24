var url = require('url');
var http = require('http')
var fs = require('fs')
var port = 3000
var BussinessLayer = require('./BussinessLayer/BussinessLayer');

var app = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);
    if (req.method == "get" || req.method == "GET") {
        // console.log(url.parse(req.url, true));
        let parsedURL = url.parse(req.url, true);
        switch (parsedURL.pathname) {
            //trả về giao diện html
            case "/":
            {
                res.setHeader('Content-type', 'text/html');
                res.setHeader('Access-Control-Allow-Origin', '*');
                let htmlFile = fs.readFileSync('./PresentationLayer/QuanLyQuanAn.html');
                res.end(htmlFile);
                break;
            }
            //trả về javascript
            case "/QuanLyQuanAn.js":
            {
                res.setHeader('Content-type', 'text/js');
                res.setHeader('Access-Control-Allow-Origin', '*');
                let jsFile = fs.readFileSync('./PresentationLayer/QuanLyQuanAn.js');
                res.end(jsFile);
                break;
            }
            //Đọc dữ liệu
            case "/Doc":
                {
                    res.setHeader('Content-type', 'text/plain');
                    res.setHeader('Access-Control-Allow-Origin', "*");
                    data = BussinessLayer.Doc();
                    //  console.log(data);
                    res.end(data);
                    break;
                }
                //Thêm dữ liệu
            case "/Them":
                {
                    res.setHeader('Content-type', 'text/plain');
                    res.setHeader('Access-Control-Allow-Origin', "*");
                    data = BussinessLayer.Them(parsedURL.query);
                    res.end(data);
                    break;
                }
                //Xóa dữ liệu
            case "/Xoa":
                {
                    res.setHeader('Content-type', 'text/plain');
                    res.setHeader('Access-Control-Allow-Origin', "*");
                    data = BussinessLayer.Xoa(parsedURL.query);
                    res.end(data);
                    break;
                }
                //Chỉnh sửa dữ liệu
            case "/CapNhat":
                {
                    res.setHeader('Content-type', 'text/plain');
                    res.setHeader('Access-Control-Allow-Origin', "*");
                    data = BussinessLayer.CapNhat(parsedURL.query);
                    res.end(data);
                    break;
                }
            default:
                {
                    res.end("Không tìm thấy yêu cầu");
                }
        }
    }
});

app.listen(port, (err) => {
    if (err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port 3000')
});