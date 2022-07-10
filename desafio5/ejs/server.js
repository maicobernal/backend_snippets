const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs');
app.set('views', "./views");

const productos = require('./productos.js')

app.use(express.static('public'));
app.use ('/api/productos', productos)

app.get("/",(req, res) => {
    try {
        res.render('./sections/construccion.ejs')
    } catch (err) {
        res.status(500).send('Error en el proceso GET :' + err)
    }
}) 


const port = 8080
const server = app.listen(port,()=>{
        console.log('Servidor corriendo en el puerto: ' + server.address().port)
    })

server.on('error', (error)=>{
    console.log(`Error en el servidor ${error}`)
})

