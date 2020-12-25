$(window).load(function() {
    $.ajax({
        url: '../../../applications',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        success: function (result) { 
            result.forEach(order => {
                let createdAt = new Date(order.createdAt);
                let createdAtStr = `${createdAt.getDate()}.${createdAt.getMonth() + 1}.${createdAt.getFullYear()} ${createdAt.getHours()}.${createdAt.getMinutes()}`;
                $('#ordersTableBody').append(`
                <tr>
                    <td>${order.idAI}</td>
                    <td>
                        <div class='d-flex justify-content-between'>
                            <div class='mr-2 text-nowrap'>${order.status}</div>
                            <div>
                                <button class="btn btn-outline-primary btn-sm text-primary" onclick="modalChandeStatus('${order._id}', '${order.idAI}')">&#9998;</button>
                            </div>
                        </div>
                    </td>
                    <td>${order.urlAcc}</td>
                    <td>${order.urlGame}</td>
                    <td class='text-nowrap'>${createdAtStr}</td>
                </tr>
                `);
            });
        },
        error: function () {
            console.log("error");
        }
    });
});

function closeModal() {
    $('#modalChangeStatus').removeClass('d-block');
}

function modalChandeStatus(itemId, itemNumber) {
    $('#modalChangeStatus').addClass('d-block');
    $('#orderIdAI').text(itemNumber);
    changeStatusForm.orderId.value = itemId;
}

function sendOrderStatus() {
    closeModal();
    $.ajax({
        url: '../../../changestatus',
        data: $('form#changeStatusForm').serialize(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "POST",
        success: function (res) { 
            alert('Статус заявки изменён успешно');
            document.location.reload();
        },
        error: function () {
            alert('Что-то пошло не так');
        }
    });
}