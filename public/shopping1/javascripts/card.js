$('.cardType').on("click", (e) => {
    $('.cardType').removeClass("selected");
    $(e.target).addClass("selected");
});

$('.section').on("click", (e) => {
    const target = $(e.target); 
    if(target.is('.title')) {
        $('.section').removeClass("opened")
        target.parent().addClass("opened");
        if(target.parent().is('#first')) {
            $('#keypad').css('bottom', '-40vh');
        } else if (target.parent().is('#cardNumber')) {
            $('#keypad').css('bottom', '0vh');
        }
    } else if (target.is('.cardType')) {
        const section = target.parent().parent()
        section.removeClass("opened")
        section.next('.section').addClass("opened");
        $('#keypad').css('bottom', '0vh');
        $('.currentInput').removeClass('currentInput');
        $(document.querySelector("#cardNumber > div > div:nth-child(1) > div > span:nth-child(1)")).addClass('currentInput');
        resetSpans();
    }
});

$('.dataInput').on("click", (e) => {
    const target = $(e.target);
    if(target.is('span')) {
        $('.currentInput').removeClass("currentInput");
        $(e.target).addClass("currentInput");
        $('#keypad').css('bottom', '0vh');
    }
});

$('#pay').on("click", (e) => {
    if( $('.selected').length == 0) {
        alert("카드를 선택해주세요!");
        return;
    }

    if( Array.from(document.querySelector("#cardNumber > div")
        .getElementsByTagName("span"))
        .reduce((acc, span) => {
            if(!acc) {
                if(span.dataset.current == span.dataset.max)
                    return false;
                else
                    return true;
            } else {
                return true;
            }
        }, false) ) {
        alert("카드 정보를 모두 입력해주세요! ")
        return; 
    }
    
    const cardType = $('.selected').text();
    const cardSpan = $($('.dataInput')[0]).find('span');
    const cardNum = Array(cardSpan).reduce((acc, v) => { return acc + v.text(); }, "");
    const cards = cardType.trim() + " " + cardNum.trim();

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.status == 200) {
            window.location.href = "/shopping1/result";
        } else {
            console.error(xhr.status, xhr.responseText);
        }
    };
    xhr.open('POST', '/shopping1/result');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ cards }));
});

