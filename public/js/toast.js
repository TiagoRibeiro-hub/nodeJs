var toastTrigger = document.getElementById('liveToastBtn');
var toastLive = document.getElementById('liveToast');
if (toastTrigger) {
    toastTrigger.addEventListener('click', function() {
        var toast = new bootstrap.Toast(toastLive)
        toast.show()
    })
}