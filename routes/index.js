var express = require('express');
var router = express.Router();

const NUMCODES = "0123456789";
var code = Array(6).fill(undefined).map((v) => {
    return NUMCODES[Math.floor(Math.random() * 10)];
}).toString().replace(/,/gi, "");
console.log(code);
setInterval(() => {
    code = Array(6).fill(undefined).map((v) => {
        return NUMCODES[Math.floor(Math.random() * 10)];
    }).toString().replace(/,/gi, "");
    console.log(code);
}, 3600000 * 2);

router.get('/', function(req, res, next) {
    if(req.session.authenticated)
        res.render('index/menu', {
            layout: false
        });
    else 
        res.render('index/auth', {
            layout: false
        });
});

router.post('/', function(req, res, next) {
    if(req.body.authCode == code) {
        cout 
        req.session.authenticated = true;
        res.send(true);
    } else {
        res.send(false);
    }
});

module.exports = router;