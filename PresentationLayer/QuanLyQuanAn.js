let idCapNhat, idXoa;

document.body.onload = () => {
    $.get('/Doc', function (data, textStatus) {
        $('.container').append(data);
    })
}

//THÊM THÔNG TIN QUÁN ĂN
$('#btnXacNhanThem').click(function () {
    let modalBody = $('#modalThemQuanAn .modal-body');
    let data = {
        ten: modalBody.find('#ten').val(),
        moTa: modalBody.find('#moTa').val(),
        diaChi: modalBody.find('#diaChi').val(),
        sdt: modalBody.find('#sdt').val(),
    }
    //gói data lại và gửi đến server
    data = encodeURIComponent(JSON.stringify(data));
    $.get(`/Them?data=${data}`, function (responeData, textStatus) {
        if (responeData != "true") {
            $('#modalThemQuanAn').modal('hide');
            alert('Thêm thất bại');
            return;
        }
        $('#modalThemQuanAn').modal('hide');
        alert('Thêm thành công');
        location.reload();
    })
    console.log(data);
})

//XÓA THÔNG TIN QUÁN ĂN
$('#modalXoaQuanAn').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    idXoa = button.data('id');
})
$('#btnXacNhanXoa').click(function () {
    $.get(`/Xoa?maSo=${idXoa}`, function (responeData, textStatus) {
        if (responeData != "true") {
            $('#modalXoaQuanAn').modal('hide');
            alert('Xóa thất bại');
            return;
        }
        $('#modalXoaQuanAn').modal('hide');
        alert('Xóa thành công');
        location.reload();
    })
    console.log(data);
})

//CẬP NHẬT THÔNG TIN QUÁN ĂN
$('#modalCapNhatQuanAn').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    let modalBody = $('#modalCapNhatQuanAn .modal-body');
    idCapNhat = button.data('id');
    modalBody.find('#ten').val($(`#${idCapNhat} h4`).text());
    modalBody.find('#moTa').val($(`#${idCapNhat} h5`).text());
    modalBody.find('#diaChi').val($(`#${idCapNhat} div div:nth-of-type(1)`).text());
    modalBody.find('#sdt').val($(`#${idCapNhat} div div:nth-of-type(2)`).text());
    console.log(idCapNhat)
})
$('#btnXacNhanCapNhat').click(function () {
    let modalBody = $('#modalCapNhatQuanAn .modal-body');
    let data = {
        ten: modalBody.find('#ten').val(),
        moTa: modalBody.find('#moTa').val(),
        diaChi: modalBody.find('#diaChi').val(),
        sdt: modalBody.find('#sdt').val(),
    }
    //gói data lại và gửi đến server
    data = encodeURIComponent(JSON.stringify(data));
    $.get(`/CapNhat?maSo=${idCapNhat}&data=${data}`, function (responeData, textStatus) {
        if (responeData != "true") {
            $('#modalCapNhatQuanAn').modal('hide');
            alert('Cập nhật thất bại');
            return;
        }
        $('#modalCapNhatQuanAn').modal('hide');
        alert('Cập nhật thành công');
        location.reload();
    })
    console.log(data);
})