

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require("path");
require('dotenv').config()
const port = process.env.PORT_NUMBER;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const passport = require('passport')
require('./passport-config');

/*_______________SWAGER_________________*/
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const adminserviceswaggerJsdoc = YAML.load("./apiDoc/adminservice.yaml"); // adminservice
app.use("/apiDoc/adani_microservic_1", swaggerUI.serve, swaggerUI.setup(adminserviceswaggerJsdoc))
/*_______________SWAGER  END_________________*/

// SERVICES BASE URL
const registrationProfileNode_baseUrl = process.env.registrationProfileNode_baseUrl;

// REGISTRATION  ROUTES
const registrationRoute = require('./src/routes/registrationRoute');
const authnRoute = require('./src/routes/authnRoutes')

//============ WELCOME TO HOME  ===============
app.use("/server", (req, res) => {
    // sdk.start();
    res.end("<h1 style='text-align:center;color:white;background-color:red'>Welcome to  backend registrationProfileNode_9001 server </h1>")
})

// registrationProfileNode ROUTES  EXECUTIONS 
app.use(registrationProfileNode_baseUrl, registrationRoute); //   REGISTRATION  ROUTER
app.use(registrationProfileNode_baseUrl, passport.authenticate('jwt', { session: false }), authnRoute);



// SERVER STARTING 
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => { console.log(" ===================== SERVER IS RUNNING ON PORT =================", port); })



