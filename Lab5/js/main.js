(() => {
    const app = {
        htmlElemnts: {
            button: document.getElementById('btn-agregar'),
            resultado: document.getElementById('resultado'),
            color: document.getElementById('color'),
            nombre: document.getElementById('nombre'),
        }
        , initialize() {
            app.htmlElemnts.button.addEventListener('click', app.handlers.add);
        } 
        , handlers: {
            add: () => {
                app.methods.mostrarcandidato();
            }
        }
        , methods: {
            mostrarcandidato: () => { 
                return app.htmlElemnts.resultado.innerHTML += 
                    `<div class="card">
                        <div class="card-body">
                            <span id="bandera" style="background-color: ${app.htmlElemnts.color.value};"></span>
                            <h3>${app.htmlElemnts.nombre.value}</h3>
                        </div>
                        <div class="card-buttons">
                            <button id="minus">-</button>
                            <button id="add">+</button>
                        </div>
                    </div>`
            }

        }
        , render() {  }
    };
    app.initialize();
})();