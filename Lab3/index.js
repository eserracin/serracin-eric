( () => {
    // Función para verificar si un número es palíndromo en una base específica
    function isPalindrome(number, base) {
        const convertedNumber = number.toString(base);
        const reversedNumber = convertedNumber.split('').reverse().join('');
        return convertedNumber === reversedNumber;
    }

    // Función para verificar si un número es un palíndromo de doble base
    function isDoubleBasePalindrome(number) {
        const binaryNumber = number.toString(2);
        console.log(`el valor binaryNumber ${binaryNumber}`)
        const decimalNumber = number.toString(10);
        console.log(`el valor decimalNumber ${decimalNumber}`)
        return isPalindrome(binaryNumber, 2) && isPalindrome(decimalNumber, 10);
    }

    function checkDoubleBasePalindrome(number) {
        const num = parseInt(number, 10)
        const result = isDoubleBasePalindrome(num);
        displayResult(result ? "Es un palíndromo de doble base" : "No es un palíndromo de doble base", "resultText");
    }

    window.palindromeChecker = { checkDoubleBasePalindrome };

})();


(() => {
    function contarCaracteres(cadena){
        const cont = {};
        
        cadena.split('').forEach(letra => {
            if(cont[letra]) cont[letra]++;
            else cont[letra] = 1;
        });
        console.log(JSON.stringify(cont));
        // obtener el largo del objeto cont
        const largoObjeto = Object.keys(cont).length;
        displayResult(largoObjeto > 0 ? `El total de caracteres econtrados es: ${JSON.stringify(cont)}` : "No se especifico una cadena de caracteres", "resultText2");
    }

    window.cantidadCaracteres = { contarCaracteres };
})();


(() => {
    function esAñoBisiesto(year) {
        // validar que el añi es bisiesto y asignarlo a una variable boolean
        const esBisiesto = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
        displayResult(esBisiesto ? "El año es bisiesto": "No es un año Bisiesto", "resultText3");
    }

    window.anioBisiseto = { esAñoBisiesto }

})();

(() => {
    function esPrimo(numero) {
        // validar que el numero es primo y asignarlo a una variable boolean
        let esPrimo = true;

        for (let i = 2; i < numero; i++) {
            if (numero % i === 0) {
                esPrimo = false;
                break;
            }
        }

        return esPrimo;
    }   

    // escribe una funcion que sume los valores primos obtenidos al llamar a la funcion esPrimo
    function sumarPrimos(numero) { 
        const num = parseInt(numero, 10);
        let suma = 0;
        for (let i = 2; i <= num; i++) {
            if (esPrimo(i)) {
                suma += i;
            }
        }
        displayResult(`La suma de los numeros primos es: ${suma}`, "resultText4");
    }

    window.sumatoria = { sumarPrimos } 

})();

function limipiarInputs(){
    // Crear una funcion para limpiar los objetos html de tipo input que estan en el archivo index.html
    const inputs = document.querySelectorAll('input');
    const p = document.querySelectorAll('p');
    p.forEach(p => {
        p.textContent = '';
    });
    inputs.forEach(input => {
        input.value = '';
    });
}

function displayResult(message, idElemento) {
    const resultLabel = document.getElementById(idElemento);
    resultLabel.textContent = message;
}


