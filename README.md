# Requisitos
    Node.js ^18.13.0 || ^20.9.0
    Typescript >=5.2.0 <5.4.0
    Npm ^10.2.4


# Instalación

Clonar el repositorio, con el comando: `git clone https://github.com/cmruizg1993/DemoSofka.git`

Abrir la carpeta del repositorio `cd ./DemoSofka`

Instalar dependencias `npm i`

## Correr aplicación

Ejecutar el comando `npm run start` 

## Docker

`docker build -t demo-sofka-image .` 

`docker run --name demo-sofka-container -p <HostPort>:8080 -d demo-sofka-image`


## Pruebas Unitarias

Ejecutar el comando `npm run test` para correr las pruebas unitarias vía [jest]

Ejecutar el comando `npm run test:coverage` para verificar la cobertura de las pruebas

## Nota

Se considera que el API, está corriendo en `localhost:3002`

## Para mas información

Puedes contactarme a mi correo personal: cmruizg1993@gmail.com
