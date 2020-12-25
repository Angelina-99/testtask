$(window).load(function() {
    let orderId = decodeURIComponent(window.location).split('order/')[1];
    $.ajax({
        url: `../../../applications/${orderId}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        success: function (result) { 
            $('#orderId').text(`ID заявки: ${result.idAI}`);
            $('#urlAcc').text(result.urlAcc);
            $('#urlGame').text(result.urlGame);
            $('#status').text(result.status);
            let createdAt = new Date(result.createdAt);
            $('#createdAt').html(`${createdAt.getDate()}.${createdAt.getMonth() + 1}.${createdAt.getFullYear()} ${createdAt.getHours()}.${createdAt.getMinutes()}`);
        },
        error: function () {
            console.log("error");
        }
    });
});