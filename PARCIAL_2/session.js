((Util) => {
    const SESSION_KEY = 'sessionData';
    const CURRENT_USER = 'currentUser';

    // Función para obtener los datos almacenados en localStorage
    const getData = (KEY) => {
      const data = localStorage.getItem(KEY);
      return data ? JSON.parse(data) : [];
    }

    //  Función para guardar los datos en localStorage
    const setData = (data, key) => {
      localStorage.setItem(key, JSON.stringify(data));
    }

    const validateAlreadyUserRegister= (username) => {
      const data = getData(SESSION_KEY);
      let isRegistered = false;
      data.forEach((item) => {
        if (item.username === username) {
          isRegistered = true;
        }
      });
      return isRegistered;
    }


    const Session = {
      register(_name, _username, _password, page = "login.html") {
        const isRegistered = validateAlreadyUserRegister(_username);
        if (isRegistered) {
          alert("Usuario ya registrado");
          return;
        }
        const sessionData = getData(SESSION_KEY);
        sessionData.push({ name: _name, username: _username, password: Util.hashCode(_password)});
        setData(sessionData, SESSION_KEY);
        console.log(`DATA: ${JSON.stringify(sessionData)}`);
        window.location.href = page;
      },
      login(username, password, page = "profile.html") {
        const data = getData(SESSION_KEY);
        const passwordHash = Util.hashCode(password);
        let loggedIn = false;
        console.log(`DATA: ${JSON.stringify(data)}`);
        data.forEach((item) => { 
          if (item.username === username && item.password === passwordHash) {
            localStorage.setItem("username", username);
            const userData = getData(CURRENT_USER);
            userData.push({ username: item.username, name: item.name });
            setData(userData, CURRENT_USER);
            loggedIn = true;
            window.location.href = page;
          }
        });

        if (!loggedIn) {
          alert("Invalid username or password");
        }
      },
      logout(page = "login.html") {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('username');
        window.location.href = page;
      },
      shouldNotBeLoggedIn(page = "profile.html") {
        if (localStorage.getItem("username"))
          window.location.href = page;
      },
      shouldBeLoggedIn(page = "login.html") {
        if (!localStorage.getItem("username"))
          window.location.href = page;
      },
      getCurrentUser() {
        return getData(CURRENT_USER);
      }
    };
    window.Session = Session;
  })(window.Util);