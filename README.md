# ATHENDAT - PA005 | E-COMMERCE-BACKEND App | e-AgroMarket

Esta aplicación se realiza con el fin de servir de enlace entre la Base de Datos en lo adelante DB y 
las aplicaciónes FrontEnd: e-AgroMarket y ATHENDAT Control Center las cuales ofrecen indistintamente a los  clientes y administradores la experiencia de compra y admistración del negocio en la plataforma.

## Iniciar servidor en modo desarrollo

Correr `npm run dev` para iniciar el servidor en modo desarrollo. Por defecto el servido inicia en 
la url: `http://localhost:3000/`. Por defecto al iniciar el servidor en modo desarrollo este se conecta 
a la DB y utiliza el paquete nodemon para actualizarce cada vez que se guarde algun cambio.

## Compilar servidor par producción

Correr `npm run build` para compilar el servidor y convertir el código.

## Iniciar servidor en modo producción

Correr `npm run start` para iniciar el servidor compilado. (Con problemas en estos momentos!) :(

## Funcionalidades

1. Cifrado de contraseñas en las base de datos.
2. Autenticación y Autorización a travéz de token de seguridad.
3. Gestión de archivos (imágenes) enviados por los usuarios.

## Seguridad

Este BackEnd oferce la generación de tokens de seguridad con una llave secreta de 512 bit y la incriptación 
de las contraseñas de los usuarios en la DB con un el algoritmo bcrypt y más de diez saltos, garantizando 
siempre la integridad de la plataforma la protección de los datos de todos los usuarios.

## Paquetes utilizados en el desarrollo

Los paquetes utilizados en el desarrollo de esta aplicación pueden ser consultados en el archivo `package.json`. Para más información sobre los mismos visitar el sitio: `https://www.npmjs.com`.

