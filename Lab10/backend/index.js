const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// pseudo-base datos
let ingresos = []
let egresos = []

// Controlador para almacenar ingresos
app.post('/api/ingresos', (req, res) => {
  const ingreso = req.body
  ingresos.push(ingreso)
  res.status(201).json({message: 'Ingreso almacenado'})
})

// Controlador para almacenar egresos
app.post('/api/egresos', (req, res) => {
  const egreso = req.body
  egresos.push(egreso)
  res.status(201).json({message: 'Egreso almacenado'})
})

// Controlador para obtener todos los ingresos
app.get('/api/ingresos', (req, res) => {
  res.json(ingresos)
})

// Controlador para obtener todos los egresos
app.get('/api/egresos', (req, res) => {
  res.json(egresos)
})

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`)
})