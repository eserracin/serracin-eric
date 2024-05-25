((Session) => {

    const TRX_KEY = 'trxData';

    // Función para obtener los datos almacenados en localStorage
    const getData = (KEY) => {
        const data = localStorage.getItem(KEY);
        return data ? JSON.parse(data) : [];
      }
  
      //  Función para guardar los datos en localStorage
      const setData = (data, key) => {
        localStorage.setItem(key, JSON.stringify(data));
      }

    const app = {
        htmlElements: {
            btnSignUp: document.getElementById('btn-signup'),
            username : document.getElementById('username'),
            frmTransaccion: document.getElementById('transaction-form'),
            type: document.getElementById('type'),
            amount: document.getElementById('amount'),
            transactionTable: document.getElementById('transactions-table'),
            chart: document.getElementById('comparison-chart')
        },
        transactions: [],
        chartInstance: null,
        initialize() {
            Session.shouldBeLoggedIn('../Login/Login.html');
            app.htmlElements.btnSignUp.addEventListener('click', app.handlers.handleSignUp);
            app.htmlElements.frmTransaccion.addEventListener('submit', app.handlers.handleSubmit);
            app.render();
        },
        handlers: {
            handleSubmit(event) {
                event.preventDefault();
                const amount = parseInt(app.htmlElements.amount.value);
                const type = app.htmlElements.type.value;
                if(!isNaN(amount)) {
                    app.methods.addTransaction(type, amount);
                }
            },
            handleSignUp(event) {
                event.preventDefault();
                app.methods.logout();
            }
        },
        methods : {
            logout() {
                Session.logout('../Login/Login.html');
            },
            addTransaction(type, amount) {
                const trxData = getData(TRX_KEY);
                trxData.push({type, amount});
                setData(trxData, TRX_KEY);
                // app.transactions.push({type, amount});
                app.render();
            },
            updateTable() {
                const tableBody = app.htmlElements.transactionTable;
                console.log(tableBody);
                tableBody.innerHTML = '';
                const trxData = getData(TRX_KEY);
                trxData.forEach(transaction => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${transaction.type === 'inflow' ? 'Ingreso' : 'Gasto'}</td>
                        <td>${transaction.amount.toFixed(2)}</td>
                    `;
                    tableBody.appendChild(row);
                });
                // app.transactions.forEach(transaction => {
                //     const row = document.createElement('tr');
                //     row.innerHTML = `
                //         <td>${transaction.type === 'inflow' ? 'Ingreso' : 'Gasto'}</td>
                //         <td>${transaction.amount.toFixed(2)}</td>
                //     `;
                //     tableBody.appendChild(row);
                // });
            },
            updateChart () {
                const inflow = app.transactions.filter(transaction => transaction.type === 'inflow').reduce((acc, transaction) => acc + transaction.amount, 0);
                const outflow = app.transactions.filter(transaction => transaction.type === 'outflow').reduce((acc, transaction) => acc + transaction.amount, 0);

                if(app.chartInstance) {
                    app.chartInstance.data.datasets[0].data = [inflow, outflow];
                    app.chartInstance.update();
                }else {
                    const ctx = app.htmlElements.chart.getContext('2d');
                    app.chartInstance = new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: ['Ingresos', 'Gastos'],
                            datasets: [{
                                label: 'My First Dataset',
                                data: [inflow, outflow],
                                backgroundColor: [
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 99, 132)',
                                ],
                                hoverOffset: 4
                            }]
                        }
                    });
                }
            }
        },
        render: () => {
            const currentUserString = Session.getCurrentUser();
            if(Array.isArray(currentUserString) && currentUserString.length > 0) { 
                const name = currentUserString[0].name;
                app.htmlElements.username.innerHTML = name;
            }
            app.methods.updateTable();
            app.methods.updateChart();
        }
    };
    app.initialize();
})(window.Session);