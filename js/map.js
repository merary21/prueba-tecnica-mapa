/* Menu desplegable para mostrar opcion de "ver ubicaciones" */
function toggleMenu() {
    document.getElementById("dropdown").classList.toggle("hidden");
}


/* Mostrar el nombre del usuario que inició sesion */
function inicializarUsuario() {
    const usuario = localStorage.getItem("currentUser");
    const etiqueta = document.getElementById("userName");

    if (etiqueta && usuario) {
        etiqueta.innerText = `Hola, ${usuario}`;
    }
}

inicializarUsuario();


/* Configuración básica del mapa */
const CONFIG_MAPA = {
    centro: [13.6929, -89.2182],
    zoom: 13,
    tiles: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
};


/* Crear el mapa y posicionarlo en el centro definido */
const mapa = L.map('map').setView(CONFIG_MAPA.centro, CONFIG_MAPA.zoom);


/* Cargar las imágenes del mapa */
L.tileLayer(CONFIG_MAPA.tiles, {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
}).addTo(mapa);


/* Lista de ubicaciones iniciales que aparecen en el mapa */
const MARCADORES_INICIALES = [
    { lat: 13.6929, lng: -89.2182, nombre: "Ubicación 1" },
    { lat: 13.70, lng: -89.20, nombre: "Ubicación 2" },
    { lat: 13.68, lng: -89.22, nombre: "Ubicación 3" }
];

let marcadoresActivos = [];


/* Obtener las ubicaciones guardadas en el navegador */
function obtenerUbicaciones() {
    try {
        return JSON.parse(localStorage.getItem("locations")) || [];
    } catch {
        return [];
    }
}


/* Guardar las ubicaciones en el navegador */
function guardarUbicaciones(ubicaciones) {
    localStorage.setItem("locations", JSON.stringify(ubicaciones));
}


/* Crear un marcador en el mapa con opción de moverlo */
function crearMarcador({ lat, lng, nombre }) {

    const marcador = L.marker([lat, lng], { draggable: true })
        .addTo(mapa)
        .bindPopup(nombre);

    /* Cuando el usuario suelta el marcador, se ejecuta esta función */
    marcador.on('dragend', () => manejarMovimiento(marcador, nombre));

    return marcador;
}


/* Guardar la nueva posición del marcador si el usuario lo confirma */
function manejarMovimiento(marcador, nombre) {

    const posicion = marcador.getLatLng();

    if (!confirm(`¿Guardar nueva posición de "${nombre}"?`)) return;

    const ubicaciones = obtenerUbicaciones();

    ubicaciones.push({
        name: nombre,
        lat: posicion.lat,
        lng: posicion.lng,
        fecha: new Date().toISOString()
    });

    guardarUbicaciones(ubicaciones);

    alert("Ubicación guardada correctamente");
}


/* Crear todos los marcadores iniciales en el mapa */
function cargarMarcadores() {
    MARCADORES_INICIALES.forEach(data => {
        marcadoresActivos.push(crearMarcador(data));
    });
}

cargarMarcadores();


/* Redirigir a la página donde se muestran las ubicaciones guardadas */
function verUbicaciones() {
    document.getElementById("dropdown").classList.add("hidden");
    window.location.href = "ubicaciones.html";
}


/* Leer parámetros de la URL para centrar el mapa en una ubicación específica */
function procesarParametrosURL() {

    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');
    const lng = params.get('lng');
    const nombre = params.get('nombre');

    if (!lat || !lng) return;

    const coords = [parseFloat(lat), parseFloat(lng)];

    /* Mover el mapa suavemente hacia la ubicación */
    mapa.flyTo(coords, 16, { duration: 1.5 });

    /* Crear un marcador temporal para mostrar la ubicación */
    const marcadorTemp = L.marker(coords).addTo(mapa);
    marcadorTemp.bindPopup(`<b>${nombre || 'Ubicación'}</b>`).openPopup();

    /* Eliminar el marcador después de unos segundos */
    setTimeout(() => mapa.removeLayer(marcadorTemp), 8000);

    /* Limpiar la URL para que no se repita la acción */
    setTimeout(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
    }, 3000);
}


/* Ejecutar la función cuando la página termina de cargar */
window.addEventListener('DOMContentLoaded', procesarParametrosURL);