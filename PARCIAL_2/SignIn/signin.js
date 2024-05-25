((Session) => {
    const app = {
        htmlElements: {
            form: document.getElementById('frm-sign-in'),
            button: document.getElementById('btn-sign-in'),
            username: document.getElementById('username'),
            password: document.getElementById('password'),
            name: document.getElementById('name'),
        },
        initialize() {
            app.htmlElements.form.addEventListener('submit', app.handlers.handleSignIn);
        },
        handlers: {
            handleSignIn: (event) => {
                event.preventDefault();
                const username = app.htmlElements.username.value;
                const password = app.htmlElements.password.value;
                const name = app.htmlElements.name.value;

                Session.register(name, username, password, "../Login/login.html");
                alert('usuario registrado con exito!');
            }
        },
        methods : {
        },
    };
    app.initialize();
})(window.Session);