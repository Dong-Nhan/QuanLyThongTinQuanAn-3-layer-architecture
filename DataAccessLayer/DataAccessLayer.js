var fs = require("fs");
var DuongDan = "./";
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var TenFile = "Database.xml";

class DataAccessLayer {
    Doc() {
        let ChuoiDuLieuGoc = fs.readFileSync(DuongDan + TenFile, "utf8");
        return ChuoiDuLieuGoc;
    }

    Ghi(chuoiXML) {
        fs.writeFileSync(DuongDan + TenFile, chuoiXML, function (err) {
            if (err) {
                throw err;
            }
            console.log('Ghi file thanh cong');
        });
    }

}

module.exports = new DataAccessLayer();