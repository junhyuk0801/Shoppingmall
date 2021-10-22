function showModal() {
    $("#modal").show();
};
function closeModal() {
    $('.searchModal').hide();
};

var sumAddr = function() {
    var road = document.getElementById("roadAdd").innerHTML;
    var detail = document.getElementById("detailAdd").value;
    
    document.getElementById("completeAdd").innerHTML = road + " " + detail;
}

var findAddr = function() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById("roadAdd").innerHTML = data.roadAddress;
            document.getElementById("areaAdd").innerHTML = data.jibunAddress;
            sumAddr();
        }
    }).open();
}

var fillAddr = function() {
    var addr = document.getElementById("completeAdd").innerHTML;
    document.getElementById("deliverAddress").innerHTML = addr;
    closeModal();
}

var detectUserInput = function() {
    const input =  document.getElementById("memoInput");

    if(document.getElementById("memo").value == "직접 입력") {
        input.style = "display: block;";
    } else {
        input.style = "display: none;";
    }
}

var detectCardType = function(display) {
    if(display) {
        document.getElementById("cardType").style = "width: 60vw; display: block";
    } else {
        document.getElementById("cardType").style = "width: 60vw; display: none";
    }
}

var pay = function() {
    const address = document.getElementById("deliverAddress").innerHTML.trim();
    const memoValue = document.getElementById("memo").value;
    const memo = ( memoValue == "직접 입력" ? document.getElementById("memoInput").value : memoValue );
    const pays = document.getElementsByName('pay');
    const price = Number(document.getElementById('price').innerHTML.replace(/\D/g,''));
    const addCard = (document.getElementById('cardType').value == "카드 추가");
    const addAddress = document.getElementById('useNext').checked

    if(address == "") {
        alert("주소를 입력해주세요!");
        return;
    }

    let pay = null;
    for(let i = 0; i < pays.length; i++) {
        if (pays[i].checked) {
            pay = pays[i].value;
            break;
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if(xhr.status == 200) {
            window.location.href = "/shopping1/pay"
        } else {
            console.error(xhr.responseText);
        }
    }
    xhr.open('POST', '/shopping1/pay');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify( { address, pay, price, addCard, addAddress } ));
}