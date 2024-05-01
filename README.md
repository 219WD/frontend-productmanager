# Stock Manager

Este proyecto final, desarrollado como parte del programa de estudios en Rolling Code School, surge de una necesidad real que observé mientras trabajaba en una distribuidora de alimentos. Noté que tenían dificultades en el control de stock de sus productos debido a métodos obsoletos y poco precisos.

Inicialmente, llevaban un registro manual de los productos que ingresaban, anotando sus fechas de vencimiento en un cuaderno para luego trasladar estos datos a una hoja de cálculo. Esta práctica generaba pérdidas constantes debido al vencimiento del stock.

Decidí intervenir desarrollando una aplicación web completamente responsiva, diseñada para permitir un control minucioso de los productos desde la comodidad de un celular o una computadora de oficina.

Para hacer este frontend utilice React con Vite en primera instancia utilice Bootstrap para simplificar de manera eficiente la interfaz visual y priorizar ante todo la funcionabilidad en conexion con el backend, luego a medida que fui terminando fui personalizando mas la interfaz hasta llegar al resultado final que es esta interfaz practica y sencilla, con una paleta de colores establecida y utilizada en todas sus secciones; iconos descriptivos de Font Awesome. Para las animaciones basicas utilice AOS que basicamente es un observador para captar el scroll y desatar las animaciones en el viewport. Proximamente utilizare framer-motion para hacerlo mas complejo. Tambien utilice Sweet Alert 2 para que el usuario tenga una experiencia mas agradable al registrarse o iniciar sesion, y tambien una confirmacion a la hora de eliminar algo o promover a un administrador. Y para el manejo de las autenticaciones y validaciones utilice JWT y PropTypes.
## Instalación

1. Clona este repositorio en tu máquina local:
```
git clone https://github.com/219WD/frontend-productmanager.git
```
2. Ingresa al directorio del proyecto:
```
cd product-manager
```
3. Instala las dependencias:
```
npm install
```

## Uso

1. Asegúrate de tener el backend de Stock Manager en ejecución.
2. Configura la URL del backend en el archivo de configuración src/common/constants.js:

```
const API_URL = "http://localhost:8000";
export default API_URL;
```
3. Ejecuta la aplicación:
```
npm run dev
```

## Tecnologías utilizadas

### Tecnologías principales:
- React.js
- React Router
- Fetch

### Bibliotecas y herramientas adicionales:
- Bootstrap
- Font Awesome
- Sweet Alert 2
- AOS
- Prop Types
- JWT

## Desarrollado por:
- [Juan Canepa]

