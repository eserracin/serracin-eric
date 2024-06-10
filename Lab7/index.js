const express = require('express');
const app = express();
const PORT = 3000;

// Función que genera la serie de Fibonacci
function fibonacciSeries(n) {
    let fibSeries = [];
    let a = 0, b = 1, next;
    for (let i = 0; i < n; i++) {
        fibSeries.push(a);
        next = a + b;
        a = b;
        b = next;
    }
    return fibSeries;
}

// Endpoint para retornar la serie de Fibonacci
app.get('/fibonacci/:number', (req, res) => {
    const num = parseInt(req.params.number);
    if (isNaN(num) || num <= 0) {
        return res.status(400).json({ error: "Número Invalido. El valor debe ser entero positivo." });
    }
    const result = fibonacciSeries(num);
    res.json(result);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
