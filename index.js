var express = require('express');
var app = express();
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

    console.log(nombre);

    if (nombre == undefined) {
        validacion = false;
    }
    else {
        if (nombre.length == 0)
        {
            validacion = false;
        }
    }

    if (email == undefined) {
        validacion = false;

    }
    else
    {
        if (email.length == 0)
        {
            validacion = false;
        }

    }


    if (validacion==true)
    {
        var helper = require('sendgrid').mail;
        var from_email = new helper.Email('edn_hack@hotmail.com');
        var to_email = new helper.Email(email);
        var subject = 'Confirmación de email para registrarse en Precio Justo !';
        var content = new helper.Content('text/plain', 'Hola! '+ nombre + ', para dar de alta tu cuenta ingrese el codigo confirmación. 0001' );
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')('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');
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        });

        res.send("Se envio un correo a su buzon " + email);
    }
    else
    {
        res.send(msgValorRequerido)
    }

})


app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})


