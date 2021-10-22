var deleteItem = function(item) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status == 200) {
            window.location.reload()
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('DELETE', '/shopping1/basket');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ prodId: item }));
}

var payment = function() {
    var totalPrice = document.getElementById('total').innerHTML;

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status == 200) {
            window.location.href = "/shopping1/payment";
        } else {
            console.error(xhr.status, xhr.responseText);
        }
    };
    xhr.open('POST', '/shopping1/payment');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ totalPrice: totalPrice }));
}