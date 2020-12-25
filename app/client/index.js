function postApplication() {
    if (isValidAcc(applicationForm.urlAcc) && isValidGame(applicationForm.urlGame)) {
        $.ajax({
            url: '../../applications/count',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "GET",
            success: function (result) { 
                applicationForm.idAI.value = result.applicationsCount + 1;
                $.ajax({
                    url: '../../applications',
                    data: $('form#applicationForm').serialize(),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    type: "POST",
                    success: function (res) { 
                        document.location.href = `../../order/${res._id}`;
                    },
                    error: function () {
                        console.log("error");
                    }
                });
            },
            error: function () {
                console.log("error");
            }
        });
    };
}
  
function isValidGame(formControl) {
    const pattern = new RegExp('^https?:\\/\\/store.steampowered.com');
    if (!pattern.test(formControl.value)) {
        $(formControl).addClass('is-invalid');
    }
    else {
        $(formControl).removeClass('is-invalid');
    }
    return pattern.test(formControl.value);
}

function isValidAcc(formControl) {
    const pattern = new RegExp('^https?:\\/\\/steamcommunity.com');
    if (!pattern.test(formControl.value)) {
        $(formControl).addClass('is-invalid');
    }
    else {
        $(formControl).removeClass('is-invalid');
    }
    return pattern.test(formControl.value);
}