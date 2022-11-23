// Dependance 
const axios = require('axios');
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
})

var debug = false
var ip
var port
var token
var skipssl


function setDebug(string) {
    if (!string) {
        debug = false
    } else if (string = true || false) {
        debug = string
    } else {
        debug = false
    }
}

// IsStarted function :

function isStarted() {
    if (debug === true) {
        return console.log("The module is fully loaded")
    } else {
        return console.log("Not in debug mode")
    }
}


function StoreData(tableau) {
    //console.log(tableau)
    //console.log(tableau.SkipSSL)
   // console.log(JSON.parse(tableau.SkipSSL))
    if (!tableau) {
        console.log("Veuillez revoir vos données inscris dans la fonction store. 1")
    } else if (!tableau.ip || !tableau.port || !tableau.token || tableau.SkipSSL !== true && tableau.SkipSSL !== false) {
        console.log("Veuillez revoir vos données inscris dans la fonction store. 2")



    } 

    else {
        ip = tableau.ip
        port = tableau.port
        token = tableau.token
        skipssl = tableau.SkipSSL

    }
}


function AuthAPI() {

    if (!ip || !port || !token || skipssl !== true && skipssl !== false) {
        return console.log("Verifiez votre utilisation de la fonction store, voir la documentation. 4")
    } else {


        //console.log(ip + " " + token + " " +port)
        axios.defaults.headers.common["Authorization"] = token;

        const params = {};
        if(skipssl) {
            params['httpsAgent'] = agent;

        }
        axios.get(
            `https://${ip}:${port}/api2/json/version`,
            params
        ).then((response) => {
            console.log("Connexion effectué => Version de proxmox utilisé : " + response.data.data.version)
        }, (error) => {
            if (!debug) {
                console.log("ERREUR => '" + error.code + "', \nSi vous ne comprenez pas cette erreur, activez le mode debug ou contactez le créateur. ")
            } else {
                console.log(error)
            }
        })
    }



    //axios.get('https://192.168.1.69:8006/api2/json/version', {
    //  httpsAgent: agent
    //}).then((response) => {
    //  console.log("Votre token est valide -- Connecté a l'api !")
    //}, (error) => {
    //  if (debug) {
    //    console.log(error)
    //} else {
    //console.log("Une erreur s'est produite. Veuillez vérifié la validité du token ou met le mode débug en actif afin de visualiser l'erreur.")
    // }
    // })
}


module.exports = {
    IsStarted: isStarted,
    auth: AuthAPI,
    store: StoreData,
    debug: setDebug
}

