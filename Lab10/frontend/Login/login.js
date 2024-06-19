((Session) => {
    const app = {
        htmlElements: {
            form: document.getElementById('frm-login'),
            button: document.getElementById('btn-login'),
            username: document.getElementById('username'),
            password: document.getElementById('password'),
        },
        initialize() {
            Session.shouldNotBeLoggedIn('../Dashboard/Dashboard.html');
            app.htmlElements.form.addEventListener('submit', app.handlers.handleLogin);
        },
        handlers: {
            handleLogin(event) {
                event.preventDefault();
                app.methods.validateFields();
            }
        },
        methods : {
            validateFields() {
                const username = app.htmlElements.username.value;
                const password = app.htmlElements.password.value;
                if (username === '' || password === '') {
                    alert('Por favor, complete todos los campos');
                    return;
                }
                Session.login(username, password, '../Dashboard/Dashboard.html');
            },
        },
    };
    app.initialize();
})(window.Session);