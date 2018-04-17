var express = require('express')
var app = express()
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
    response.send('Hello World!')
})

app.get('/registro:email', function(request, response) {
    var parametros = request.params.email;
    response.send('Registro!' + parametros)
})



// parameters sent with
app.post('/crearuser', function(req, res) {
    var nombre = req.body.nombre;
    var email = req.body.email;

    res.send('Datos: ' + nombre + ' ' + email);
});


app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})


