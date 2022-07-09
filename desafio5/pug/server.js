const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug');
app.set('views', "./views");

app.get("/", async (req, res) => {
    try {
        res.render('index.pug',{reemplazo: 'Sitio web en construcción'})
    } catch (err) {
        res.status(500).send('Error en el proceso GET :' + err)
    }
}) 

const productos = require('./productos.js')

app.use(express.static('public'));
app.use ('/api/productos', productos)

const port = 8080
const server = app.listen(port,()=>{
        console.log('Servidor corriendo en el puerto: ' + server.address().port)
    })

server.on('error', (error)=>{
    console.log(`Error en el servidor ${error}`)
})

