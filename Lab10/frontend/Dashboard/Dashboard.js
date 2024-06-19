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
            async addTransaction(type, amount) {
                const trxData = getData(TRX_KEY);
                const currentUser = Session.getCurrentUsername();

                if (type === 'inflow') {
                    app.methods.addIcome(currentUser, amount);
                } else {
                    app.methods.addExpense(amount);
                }
            },
            async addIcome(currentUser, amount) {
                try{
                    const response = await fetch('http://localhost:3000/api/ingresos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },

                        payload: {
                            type: 'inflow',
                            amount: amount,
                            currentUser: currentUser
                        },

                        body: JSON.stringify(payload)
                    })

                    if(!response.ok) {
                        throw new Error('Error al guardar el ingreso');
                    }

                    const data = await response.json();
                    // setData(data, TRX_KEY);
                    app.render();
                }catch(error) {
                    console.error(error);
                }
            },
            async addExpense(amount) {
                try{
                    const response = await fetch('http://localhost:3000/api/egresos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ amount })
                    })

                    if(!response.ok) {
                        throw new Error('Error al guardar el egreso');
                    }

                    const data = await response.json();
                    setData(data, TRX_KEY);
                    app.render();
                }catch(error) {
                    console.error(error);
                }
            },
            async updateTable(currentUsername) {
                const tableBody = app.htmlElements.transactionTable;
                tableBody.innerHTML = '';

                try{
                    const response = await fetch('http://localhost/api/ingresos',{
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    if (!response.ok) {
                        throw new Error('Error al obtener los ingresos');
                    }

                    const trxData = await response.json();
                    trxData.forEach(transaction => {
                        if(transaction.currentUser === currentUsername) {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${transaction.type === 'inflow' ? 'Ingreso' : 'Gasto'}</td>
                                <td>${transaction.amount.toFixed(2)}</td>
                            `;
                            tableBody.appendChild(row);
                        }
                    });
                }catch(error){
                    console.error(error);
                }
            },
            updateChart(currentUsername) {
                const trxData = getData(TRX_KEY);
                
                const inflow = trxData.filter(t => t.currentUser === currentUsername && t.type === 'inflow').reduce((acc, t) => acc + t.amount, 0);
                const outflow = trxData.filter(t => t.currentUser === currentUsername && t.type === 'outflow').reduce((acc, t) => acc + t.amount, 0);

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
            const currentUserString = Session.getCurrentNameOfUser();
            const currentUsername = Session.getCurrentUsername();
            app.htmlElements.username.innerHTML = currentUserString;
            app.methods.updateTable(currentUsername);
            app.methods.updateChart(currentUsername);
        }
    };
    app.initialize();
})(window.Session);