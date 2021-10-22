var randIdx = Array.from(Array(10).keys())
    .map( a => ([Math.random(), a]))
    .sort((a, b) => a[0] - b[0])
    .map( a => a[1] );

var numKeys = Array.from(document.getElementById('keypad').getElementsByTagName("td"));
numKeys.splice(9, 1)
numKeys.splice(10, 1);
        
numKeys.map((v, idx) => {
    v.innerHTML = v.dataset.number = randIdx[idx];
    return v;
});

var fillSpan = function(span, num) {
    if (span.dataset.current >= span.dataset.max && num != -1)
        return false;
    else if (num == -1 && span.dataset.current <= 0)
        return false;

    let curTxt = span.innerHTML;
    if(num == "-1") {
        let idx = Number(span.dataset.current) - 1;
        span.innerHTML = curTxt.substring(0, idx) + '_' +  curTxt.substring(idx + 1);
        span.dataset.current = idx;
        return false;
    } else if (Number(span.dataset.hide)) {
        let idx = Number(span.dataset.current);
        // console.log(curTxt.substring(0, idx) + '*' +  curTxt.substring(idx + 1));
        span.innerHTML = curTxt.substring(0, idx) + '*' +  curTxt.substring(idx + 1);
        span.dataset.current = idx + 1;
        return span.dataset.current == span.dataset.max;
    } else {
        let idx = Number(span.dataset.current);
        span.innerHTML = curTxt.substring(0, idx) + num +  curTxt.substring(idx + 1);
        span.dataset.current = idx + 1;
        return span.dataset.current == span.dataset.max;
    }
}

var resetSpans = function() {
    Array.from(
        document.getElementById('cardNumber')
        .getElementsByClassName('contents')[0]
        .getElementsByTagName('span')
    ).forEach((v) => {
        v.innerHTML = '_'.repeat(Number(v.dataset.max));
        v.dataset.current = '0';
    });
}

$('.keyBtn').on("click", (e) => {
    const target = $(e.target);
    const num = target.get(0).dataset.number;
    if(!target.is('.keyBtn') || !num) return;

    let currentKey = $('.currentInput').get(0);
    if(!currentKey) return;
        
    if(fillSpan(currentKey, num)) {
        let inputSpans = (Array.from(document.getElementById('cardNumber').getElementsByClassName('contents')[0].getElementsByTagName('span')));
        let curIdx = inputSpans.findIndex((elem) => elem == currentKey);
        $('.currentInput').removeClass('currentInput');
        if(curIdx == 7) {
            $('#keypad').css('bottom', '-40vh');
        } else {
            $('.currentInput').removeClass('currentInput');
            $(inputSpans[curIdx+1]).addClass('currentInput');
        }
    }
});