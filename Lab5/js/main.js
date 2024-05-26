(() => {
    const app = {
        htmlElemnts: {
            button: document.getElementById('btn-agregar'),
            resultado: document.getElementById('resultado'),
            color: document.getElementById('color'),
            nombre: document.getElementById('nombre'),
            grafica: document.getElementById('box-grafica')
        }
        , contador: 0
        , initialize() {
            app.htmlElemnts.button.addEventListener('click', app.handlers.add);
            app.htmlElemnts.resultado.addEventListener('click', app.handlers.handleCardButtonClick);
        } 
        , handlers: {
            add: () => {
                app.methods.mostrarcandidato();
            },
            handleCardButtonClick: (event) => {
                const targetButton = event.target;
                if (targetButton.tagName !== 'BUTTON') return; 

                const card = targetButton.closest('.card');
                if (!card) return;

                const cardValue = card.querySelector('.card-value');
                if (!cardValue) return;
        
                if (targetButton.id === 'minus') {
                  cardValue.dataset.value = parseInt(cardValue.dataset.value) - 1;
                } else if (targetButton.id === 'add') {
                  cardValue.dataset.value = parseInt(cardValue.dataset.value) + 1;
                }
              }
        }
        , methods: {
            mostrarcandidato: () => { 
                app.contador++;
                return app.htmlElemnts.resultado.innerHTML += 
                    `<div class="card" data-id=card-${app.contador}>
                        <div class="card-body">
                            <span id="bandera" style="background-color: ${app.htmlElemnts.color.value};"></span>
                            <h3>${app.htmlElemnts.nombre.value}</h3>
                        </div>
                        <div class="card-buttons">
                            <button id="minus" data-value="0">-</button>
                            <span class="card-value" data-value="0">0</span>
                            <button id="add" data-value="0">+</button>
                        </div>
                    </div>`
            },
            mostrarCanvas: () => {
                app.htmlElemnts.grafica.innerHTML += 
                    `<canvas id="grafica" width="200" height="100" style="border:1px solid #000000; background-color: cadetblue;">
                    </canvas>`
            }

        }
        , render() {  }
    };
    app.initialize();
})();