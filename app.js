var server = require('express');
var app = server();
var moment = require('moment');
var port = process.env.PORT;

app.get('/', function(req,res){
    res.sendFile('views/index.html',{root: __dirname });
});

app.get('/:dates', function(req,res){
    var date = req.params.dates;

    if(date >= 0){
    var unix = moment(date, 'X').format('X');
    var day = moment(unix, 'X').format('MMMM D, YYYY');
    } else if( moment(date, 'MMMM, D, YYYY').isValid()) {
         day = moment(date).format('MMMM D, YYYY');
         unix = moment(day, 'MMMM D, YYYY').format('X');
    } else {
        day = null;
        unix = null;
    }
    res.json({
        natural: day,
        unix: unix
    });
});

app.listen(port);
