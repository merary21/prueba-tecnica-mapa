//menu
function toggleMenu() {
    document.getElementById("dropdown").classList.toggle("hidden");
}
// MOSTRAR USUARIO
let usuarioActual = localStorage.getItem("currentUser");
let etiquetaUsuario = document.getElementById("userName");

if (etiquetaUsuario) {
    etiquetaUsuario.innerText = "Hola, " + usuarioActual;
}

//------------------------------------------------------------
//Crear mapa
var mapa = L.map('map').setView([13.6929, -89.2182], 13);

// vizualizar mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(mapa);

//------------------------------------------------------------
// LISTA DE MARCADOREs
let marcadoresIniciales = [
    { lat: 13.6929, lng: -89.2182, nombre: "Ubicación 1" },
    { lat: 13.70, lng: -89.20, nombre: "Ubicación 2" },
    { lat: 13.68, lng: -89.22, nombre: "Ubicación 3" }
];

// ARREGLO PARA GUARDAR REFERENCIAS
let listaMarcadores = [];

// CREAR MARCADORES
marcadoresIniciales.forEach(data => {

    let marcador = L.marker([data.lat, data.lng], {
        draggable: true
    }).addTo(mapa);

    marcador.bindPopup(data.nombre);

    listaMarcadores.push(marcador);

    // GUARDAR LA UBICACION
    marcador.on('dragend', function () {

        let posicion = marcador.getLatLng();

        let confirmar = confirm(`¿Deseas guardar la nueva posición de "${data.nombre}"?`);

        if (confirmar) {

            let ubicaciones = JSON.parse(localStorage.getItem("locations")) || [];

            ubicaciones.push({
                name: data.nombre,
                lat: posicion.lat,
                lng: posicion.lng
            });

            localStorage.setItem("locations", JSON.stringify(ubicaciones));

            alert("Ubicación actualizada ");
        }
    });

});

//ver ubicaciones guardads

function verUbicaciones() {

    let ubicaciones = JSON.parse(localStorage.getItem("locations")) || [];

    if (ubicaciones.length === 0) {
        alert("No hay ubicaciones guardadas");
        return;
    }

    let mensaje = "Ubicaciones guardadas:\n\n";

    ubicaciones.forEach((ubicacion, index) => {
        mensaje += `${index + 1}. ${ubicacion.name} (Lat: ${ubicacion.lat.toFixed(4)}, Lng: ${ubicacion.lng.toFixed(4)})\n`;
    });

    alert(mensaje);
}