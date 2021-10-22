var express = require('express');
var router = express.Router();
const fs = require('fs');

const productFile = fs.readFileSync('./products.json');
const productJson = JSON.parse(productFile);

router.use(function(req, res, next) { // check authenticated
    if(req.session.authenticated)
        next();
    else
        res.redirect('/');
});

router.get('/', function(req, res, next) {
    res.redirect('/shopping1/products');
});

router.get('/products', function(req, res, next) {
    res.render('shopping1/products', { 
        layout: 'shopping1/frame',
        Products: productJson
     });
});

router.get('/products/:id', function(req, res, next) {
    res.render('shopping1/detail', {
        layout: 'shopping1/bottombar',
        Products: productJson, 
        Id: req.params.id,
    }); 
});

router.post('/products', function(req, res, next) {
    const { productKey, amount } = req.body;
    req.session.basket ? undefined : req.session.basket = {};
    req.session.basket[productKey] = req.session.basket[productKey] ? req.session.basket[productKey] + parseInt(amount.trim()) : parseInt(amount.trim());
    res.status(200).end();  
});

router.get('/basket', function(req, res, next) {
    const basket = req.session.basket;
    if(basket) {
        res.render('shopping1/basket', { 
            layout: 'shopping1/frame',
            display: true, 
            Products: productJson, 
            basket: basket 
        });
    } else {
        res.render('shopping1/basket', { 
            layout: 'shopping1/frame',
            display: false 
        });
    }
});

router.delete('/basket', function(req, res, next) {
    const { prodId } = req.body;
    delete req.session.basket[prodId];
    if(Object.keys(req.session.basket).length == 0) delete req.session.basket

    res.status(200).end();
});

router.get('/payment', function(req, res, next) {
    if(req.session.totalPrice) {
        const address =  req.session.address || "";
        const cards = req.session.cards || [];
        res.render('shopping1/payment', {
            layout: 'shopping1/frame',
            display: true,
            price: req.session.totalPrice, 
            address, cards 
        });
    } else {
        res.render('shopping1/payment', {
            layout: 'shopping1/frame',
            "display": false
        });
    }
});

router.post('/payment', function(req, res, next) {
    req.session.totalPrice = req.body.totalPrice;
    res.status(200).end();  
});

router.get('/pay', function(req, res, next) {
    if(req.session.paymentData.pay == "card" && req.session.paymentData.addCard) {
        res.render('shopping1/pay/card', { 
            layout  : "shopping1/pay/keypad"
         });
    } else if (req.session.paymentData.pay == "card" && !req.session.paymentData.addCard) {
        res.redirect('/result');
    } else if (req.session.paymentData.pay == "deposit") {
        res.render('shopping1/pay/deposit', { 
            layout  : false
        });
    } else {
        res.render('shopping1/payment', { 
            layout: 'shopping1/frame',
            display : false 
        });
    }
});

router.post('/pay', function(req, res, next) {
    const { address, pay, price, addCard, addAddress } = req.body;
    req.session.paymentData = { address, pay, price, addCard, addAddress };
    res.status(200).end();  

});

router.get('/result', function(req, res, next) {
    const paymentData = req.session.paymentData;
    if(paymentData.addAddress)
        req.session.address = paymentData.address
    if(paymentData.addCard && paymentData.cards)
        if(req.session.cards)   req.session.cards.push(paymentData.cards);
        else                    req.session.cards = [paymentData.cards];

    if(paymentData) {
        res.render('shopping1/result', { 
            layout  : 'shopping1/frame',
            display : true, 
            paymentData : paymentData 
        });
        delete req.session.paymentData;
    } else {
        res.render('shopping1/result', { 
            layout: 'shopping1/frame',
            display: false 
        });
    }
});

router.post('/result', function(req, res, next) {
    const { cards } = req.body;
    req.session.paymentData.cards = cards;
    res.status(200).end();
});

module.exports = router;