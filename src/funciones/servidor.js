const os = require('os')
const path = require('path')
const express = require('express')
const fs = require("fs");
const parser = require("body-parser");
const port = 3000

const localNetworkDrop= path.join(os.homedir(), 'localNetworkDrop');



const  startUp=()=>{
    if(!fs.existsSync(localNetworkDrop))
        fs.mkdir(localNetworkDrop, ()=>{})

    if(!fs.existsSync(path.join(localNetworkDrop, 'localNet')))
        fs.mkdir(path.join(localNetworkDrop, 'localNet'), ()=>{})


    startServer()


}
const startServer=()=>{
    const app= express();
    const saveLocation= localNetworkDrop;
    app.use(express.static(path.join(__dirname ,'/public')))
    app.use(express.static(path.join(__dirname ,'/SVGs')))
    app.use(express.static(path.join(__dirname ,'/views')))
    app.use(express.static(path.join(localNetworkDrop, 'Vacuum')))
    app.use(parser.urlencoded({ extended: false }))

    app.set('view engine', 'ejs')

    app.listen(port, ()=>{

        var address,
            ifaces = require('os').networkInterfaces();
        for (var dev in ifaces) {
            ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address: undefined);
        }



        console.log("Goto " + ("http://" + address + ":" + port.toString() + "/") + " in any web browser")
        console.log("in your phone or any other device to use VacuumDrop.")
    })

}
startUp()