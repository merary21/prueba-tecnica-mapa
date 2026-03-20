# Mapa con Marcadores

Aplicación web desarrollada como prueba técnica para el puesto de **Analista Programador Jr**, que permite a los usuarios registrarse, iniciar sesión y gestionar ubicaciones en un mapa interactivo mediante marcadores arrastrables.

---

## Requerimientos de la prueba

Se solicitó desarrollar una aplicación web que incluya:

- Registro de usuario
- Inicio de sesión
- Visualización de un mapa
- Marcadores en el mapa
- Capacidad de arrastrar los marcadores

---

### Funcionalidades adicionales
- Confirmación antes de guardar una ubicación
- Almacenamiento de ubicaciones guardadas
- Visualización de ubicaciones desde un menú desplegable
- Protección de rutas (no acceso al mapa sin autenticación)
- Interfaz organizada con navbar y menú interactivo
- Página de inicio (home) para mejorar la experiencia de usuario

---
## Diseño de la interfaz

La prueba pedía una aplicación web simple y no incluía requisitos de diseño específicos.

Por eso, se decidió crear un diseño sencillo, limpio y fácil de usar.

Además, se tomó la paleta de colores del logo de la empresa utilizando Adobe Color, para mantener una apariencia coherente con su identidad.
https://color.adobe.com/paleta-de-color-logo-Carossi-color-theme-567ac817-3ccd-4c42-861d-2db837d4b106 (enlace a la paleta de color)

De esta forma, se logró una interfaz simple pero visualmente atractiva.

---

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript
- Leaflet.js (mapas interactivos)
- LocalStorage (Simula base de datos)
- Git y GitHub (control de versiones)

---

## Manejo de datos

Debido a que la prueba técnica no requería el uso de una base de datos externa, se implementó el uso de **LocalStorage** como mecanismo de almacenamiento local.

Esto permite:

- Guardar usuarios registrados
- Validar inicio de sesión
- Almacenar marcadores y ubicaciones
- Mantener datos persistentes en el navegador

---

## Seguridad implementada

- Simulación de autenticación mediante token almacenado en LocalStorage
- Protección de rutas para evitar acceso sin inicio de sesión
- Validación básica de usuarios registrados
- Manejo de sesión en el navegador
---

## Cómo ejecutar el proyecto

IMPORTANTE: Abrir los archivos con doble clic (puede generar errores como el 403 al cargar el mapa). Esto ocurre porque algunos recursos del mapa requieren ejecutarse desde un servidor.

### Opción 1: Con Live Server (recomendado)

1. Abrir el proyecto en Visual Studio Code
2. Instalar la extensión Live Server
3. Clic derecho en `home.html`
4. Seleccionar "Open with Live Server"

Opción alternativa
Abrir `home.html` con doble clic.
Permite ver la interfaz  
El mapa puede no funcionar correctamente (error 403)

---

Autor: Merary Julissa Araujo
