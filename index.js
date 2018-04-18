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
    var msgValorRequerido = "Todos los valores son requeridos";
    var validacion = true;

    console.log(nombre)
    if (nombre == undefined) {
        validacion = false;
    }
    else {
        if (nombre.length = 0) {
            validacion = false;
        }
    }

    if (email == undefined) {
        validacion = false;

    }
    else if (email.length = 0) {
        validacion = false;
    }


    if (validacion) {


        const mailJet = require ('node-mailjet')
            .connect('39e245f12b88b01def3370f4c837b565',  '373283c5c60ab1556a9ac94ca0c0092e', {
                url: 'api.mailjet.com', // default is the API url
                version: 'v3.1', // default is '/v3'
                perform_api_call: true // used for tests. default is true
         })

        function handleError(err) {
            throw new Error(err.ErrorMessage);
        }


        function newContact(email) {
            mailJet.post('contact')
                .request({Email: email})
                .catch(handleError);
        }

        newContact(email);

        function testEmail(text) {
            correo = {};
            correo.FromName = 'edn.castillo@gmail.com';
            correo.FromEmail = email;
            correo.Subject = 'Precio Justo registro de nuevo usuario';
            correo['Text-Part'] = text;

            mailJet.post('send')
                .request(correo)
                .catch(handleError);
        }

        testEmail('Gracias por Registrarse');

        res.send("Se envio un correo a su buzón " + email);
    }
    else
    {
        res.send(msgValorRequerido);
    }

});


app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})


