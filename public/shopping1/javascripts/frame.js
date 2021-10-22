

var openMenu = function() {
    $('#sidebar').css('left', '0vw');
    $('#center').css('left', '40vw');
    setTimeout(() => {
        $('#menu').off("mouseup");
        $('#center').on("mouseup", closeMenu);
    }, 10);
};

var closeMenu = function() {
    $('#sidebar').css('left', '-40vw');
    $('#center').css('left', '0vw');
    setTimeout(() => {
        $('#center').off("mouseup");
        $('#menu').on("mouseup", openMenu);
    }, 10);
};

$('#menu').on("mouseup", openMenu);

var addAmount = function(delta) {
    const tmp = parseInt(document.getElementById("amount").value) + delta;
    if(0 < tmp && tmp < 99)
      document.getElementById("amount").value = tmp;
};

var buy = function() {
    const amount = document.getElementById("amount").value;
    const price = document.getElementById("price").innerHTML.replace("원", "");

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.status == 200) {
            window.location.href = "/shopping1/payment";
        } else {
            console.error(xhr.responseText);
        }
    }
    xhr.open('POST', '/shopping1/payment');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ totalPrice: amount * price }));
}

var addBasket = function() {
    const amount = document.getElementById("amount").value;
    const url = window.location.href.split('/');
    const productKey = url[url.length - 1];

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.status != 200) {
            console.error(xhr.responseText);
        }
    }
    xhr.open('POST', '/shopping1/products');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ productKey: productKey, amount: amount }));
    alert('상품이 장바구니에 추가되었습니다.');
}