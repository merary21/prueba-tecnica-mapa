// REGISTRO
function register() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    if (user === "" || pass === "") {
        alert("Campos obligatorios");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existe = users.find(u => u.user === user);
    if (existe) {
        alert("El usuario ya existe");
        return;
    }

    users.push({
        user: user,
        pass: btoa(pass)
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuario registrado");
    window.location.href = "index.html";
}

// Login
function login() {
    let user = document.getElementById("user").value;
    let pass = btoa(document.getElementById("pass").value);

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let encontrado = users.find(u => u.user === user && u.pass === pass);

    if (encontrado) {
        localStorage.setItem("token", "activo");
        localStorage.setItem("currentUser", user);
        window.location.href = "map.html";
    } else {
        alert("Credenciales incorrectas");
    }
}

// Cerrar funcion
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}

// PROTEGER RUTA
if (window.location.pathname.includes("map.html")) {
    if (!localStorage.getItem("token")) {
        window.location.href = "index.html";
    }
}