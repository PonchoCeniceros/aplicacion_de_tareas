# aplicacion_de_tareas

El siguiente proyecto es un desarrollo full stack para gestionar una lista de tareas. Esta desarrollado en el stck MERN con Typescript y sigue de forma general los preceptos de la arquitectura limpia. 

## API
La estructura del directorio `src` en el backend refleja las capas de `Infraestructura -> Aplicación -> Dominio`:

```
/src
│
├───auth/                # Módulo de autenticación (infraestructura)
│   ├───controllers.ts   # Aquí también se embebe la capa de aplicación
│   ├───middlewares.ts
│   └───routes.ts
│
├───tasks/               # Módulo de las tareas (infraestructura)
│   ├───controllers.ts   # Aquí también se embebe la capa de aplicación
│   └───routes.ts
│
├───domain/              # Entidades y reglas de negocio (dominio)
│   ├───apiResponse.ts
│   ├───jwtPayload.ts
│   ├───role.ts
│   ├───session.ts
│   └───user.ts
│
├───models/              # Esquemas y modelos de la base de datos (infraestructura)
│   └───user.model.ts
│
├───services/            # Conectores a servicios externos (infraestructura)
│   └───mongo.connector.ts
├───api.ts               # Punto de entrada y configuración de Express
└───index.ts             # Script de inicio del servidor
```

### ```.env```

```
# === GENERALES ===
# Título y descripción para la documentación de la API
TITLE=API de Tareas
DESCRIPTION=API para el manejo de tareas
VERSION=0.0.1
API_URL=http://localhost:3000/0.0.1

# === CONFIGURACIONES BACKEND NODEJS ===
# Puerto en el que correrá el servidor
PORT=3000
# Entorno de desarrollo (development, production, etc.)
NODE_ENV=development

# === CREDENCIALES JWT ===
# Clave secreta para firmar los JSON Web Tokens
SECRET_KEY=2vsvx8-HoH45q-4eXzOW-K9bOWp
# Número de rondas de salt para el hash de contraseñas con bcrypt
SALT_ROUNDS=10

# === CREDENCIALES DE INFRAESTRUCTURA ===
# URI de conexión a la base de datos MongoDB
MONGO_DB_URL=mongodb://localhost/test_db

# === FRONTEND Y CORS ===
# URL del frontend permitida para realizar peticiones (CORS)
FRONTEND_AVAILABLE_URL=http://localhost:5173
```

### Iniciar con ```npm```

1.  Instalar dependencias:
    ```bash
    npm install
    ```
2.  Construir el proyecto:
    ```bash
    npm run build
    ```
3.  Iniciar el servidor:
    ```bash
    npm start
    ```
4.  Para desarrollo:
    ```bash
    npm run dev
    ```
    el proyecto correrá en `http://localhost:3000`.

## App
El frontend está desarrollado en el stck MERN con Typescript, además de implementar estados globales con Zustand. La aplicación está estructurada utilizando una arquitectura por capas y orientada a features, lo que facilita la escalabilidad y el mantenimiento.

```
/src
│
├───main.tsx             # Punto de entrada de la aplicación
│
├───components/          # Componentes de UI reutilizables y globales
│   └───sidebar/
│
├───features/            # Lógica de negocio dividida por funcionalidad
│   ├───auth/            # Feature de autenticación
│   │   ├───components/  # Componentes específicos de la feature
│   │   ├───hooks/       # Hooks de React para la lógica de la UI
│   │   └───services/    # Llamadas a la API y gestión de datos
│   └───tasks/           # Feature de tareas
│
├───pages/               # Componentes que representan las páginas de la app
│   ├───form.tsx
│   └───list.tsx
│
└───store/               # Gestión de estado global (Zustand)
    └───session.ts
```

### Flujo de Datos

1.  **Componente de Página (`/pages`)**: Renderiza la vista principal.
2.  **Componente de Feature (`/features/.../components`)**: Encapsula la lógica y la UI de una funcionalidad específica.
3.  **Hook (`/features/.../hooks`)**: Maneja el estado local y los eventos del componente.
4.  **Servicio (`/features/.../services`)**: Realiza la llamada a la API para obtener o enviar datos.
5.  **Store (`/store`)**: Si es necesario, actualiza el estado global de la aplicación.

### Iniciar con ```npm```

1.  Instalar dependencias:
    ```bash
    npm install
    ```
2.  Iniciar el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    el proyecto correrá en `http://localhost:5173`.

3.  Para construir la aplicación para producción:
    ```bash
    npm run build
    ```
## Puesta en producción  
### VPS/Dominio/SSL

se levanta una instancia de AWS Lightsail con Ubuntu, y se instalan la s siguientes depdendencias: 
``` nodejs
docker
```

Después se crea una zona DNS en AWS, y se enlazan los registros DNS al dominio requerido:

<p align="center">
  <img src="https://github.com/PonchoCeniceros/aplicacion_de_tareas/blob/main/api/.imgs/dominio_1.png" width="500">
</p>

<p align="center">
  <img src="https://github.com/PonchoCeniceros/aplicacion_de_tareas/blob/main/api/.imgs/dominio_2.png" width="500">
</p>

La zona DNS se enlaza con el VPS:

<p align="center">
  <img src="https://github.com/PonchoCeniceros/aplicacion_de_tareas/blob/main/api/.imgs/dominio_3.png" width="500">
</p>  para el certificado SSL, este se genera desde un servicio certificador, y se comprueba la poseción del dominio mediante un registro CNAME solicitado por la certificadora:

<p align="center">
  <img src="https://github.com/PonchoCeniceros/aplicacion_de_tareas/blob/main/api/.imgs/ssl_1.png" width="500">
</p> 
<p align="center">
  <img src="https://github.com/PonchoCeniceros/aplicacion_de_tareas/blob/main/api/.imgs/ssl_2.png" width="500">
</p>

Al finalizar el proceso, se descargan los certificados.

### API

Se procede a descargar el proyecto de la API desde el repositorio de GitHub, teniendo en cuenta los siguientes archivos de configuración: 
`.env`
```
# === GENERALES ===
# Título y descripción para la documentación de la API
TITLE=API de Tareas
DESCRIPTION=API para el manejo de tareas
VERSION=0.0.1
API_URL=http://localhost:3008/0.0.1

# === CONFIGURACIONES BACKEND NODEJS ===
# Puerto en el que correrá el servidor
PORT=3008
# Entorno de desarrollo (development, production, etc.)
NODE_ENV=production

# === CREDENCIALES JWT ===
# Clave secreta para firmar los JSON Web Tokens
SECRET_KEY=2vsvx8-HoH45q-4eXzOW-K9bOWp
# Número de rondas de salt para el hash de contraseñas con bcrypt
SALT_ROUNDS=10

# === CREDENCIALES DE INFRAESTRUCTURA ===
# URI de conexión a la base de datos MongoDB
MONGO_DB_URL=mongodb://admin:Qh06q09setjx@mongo_container:27016/test_db?authSource=admin

# === FRONTEND Y CORS ===
# URL del frontend permitida para realizar peticiones (CORS)
# FRONTEND_AVAILABLE_URL=http://98.85.105.110
FRONTEND_AVAILABLE_URL=http://ponchoceniceros.com.mx
```

`docker-compose.yml`
```
version: '3'
services:
  todo_api:
    build:
      context: .
      dockerfile: Dockerfile
    env_file:
      - .env
    environment:
      - MONGO_URI=mongodb://admin:Qh06q09setjx@mongo_container:27016/test_db?authSource=admin
    ports:
      - "3008:3008"
    depends_on:
      - mongo_container
    volumes:
      - ./logs:/usr/src/api/logs

  mongo_container:
    image: mongo:5
    ports:
      - "27016:27016"
    command: ["mongod", "--port", "27016"]
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: Qh06q09setjx
    volumes:
      - sales_data:/data/db

volumes:
  sales_data:
    driver: local
```

Con esto listo, se compilan los contenedores de docker:

```
sudo docker compose down && sudo docker compose up --build -d
sudo docker ps
```

y se observan los contenedores montados correctamente:

```
CONTAINER ID   IMAGE                    COMMAND                  CREATED          STATUS          PORTS                                                        NAMES
a6a74a096b37   api_de_tareas-todo_api   "docker-entrypoint.s…"   53 minutes ago   Up 53 minutes   0.0.0.0:3008->3008/tcp, [::]:3008->3008/tcp                  api_de_tareas-todo_api-1

1677cf068610   mongo:5                  "docker-entrypoint.s…"   53 minutes ago   Up 53 minutes   0.0.0.0:27016->27016/tcp, [::]:27016->27016/tcp, 27017/tcp   api_de_tareas-mongo_container-1
```

Ahora se cargaran los certificados SSL. Primero se concatenan los certificados:

```
cat certificate.crt ca_bundle.crt > full_chain.pem
```

Y se colocan los archivos en las siguientes direcciones en sistema:

```
/etc/ssl/ponchoceniceros/private.key /etc/ssl/ponchoceniceros/full_chain.pem
```

### App

Se compila el proyecto de frontend en local mediante:

```
npm run build
```

Teniendo en cuenta el archivo `.env`:

`VITE_API_URL=https://ponchoceniceros.com.mx/0.0.1`

y mediente la herramienta filezilla, se coloca el directorio `dist/` en la ruta `/var/www/html/app_de_tareas`.

### Web server
Se realiza la siguiente configuración del servidor web `nginx` en `/etc/nginx/sites-available/default`:


```nginx
#
# DOMINIO CON SSL Y FRONTEND
#
server {
    listen 443 ssl;
    ssl_certificate      /etc/ssl/ponchoceniceros/full_chain.pem;
    ssl_certificate_key  /etc/ssl/ponchoceniceros/private.key;
    server_name ponchoceniceros.com.mx;

    root /var/www/html/app_de_tareas/dist;
    index index.html;

    location /0.0.1/ {
        proxy_pass http://localhost:3008/;
    }
}
```

## Imagenes del proyecto

<p align="center">
  <img src="https://github.com/PonchoCeniceros/aplicacion_de_tareas/blob/main/api/.imgs/01.png" width="500">
</p>

<p align="center">
  <img src="https://github.com/PonchoCeniceros/aplicacion_de_tareas/blob/main/app/.imgs/01.png" width="500">
</p>

<p align="center">
  <img src="https://github.com/PonchoCeniceros/aplicacion_de_tareas/blob/main/app/.imgs/02.png" width="500">
</p>

<p align="center">
  <img src="https://github.com/PonchoCeniceros/aplicacion_de_tareas/blob/main/app/.imgs/03.png" width="500">
</p>
