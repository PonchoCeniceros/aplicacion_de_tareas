# API de Tareas

El siguiente proyecto es una API para gestionar una lista de tareas. Esta desarrollado en el stck MERN con Typescript y sigue de forma general los preceptos de la arquitectura limpia. La estructura del directorio `src` en el backend refleja las capas de `Infraestructura -> Aplicación -> Dominio`:

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

## ```.env```

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

## Iniciar con NPM

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

## Imagenes del proyecto

<p align="center">
  <img src="https://github.com/PonchoCeniceros/api_de_tareas/blob/main/.imgs/01.png" width="500">
</p>
