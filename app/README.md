# App de Tareas

El siguiente proyecto es una aplicación de frontend para gestionar una lista de tareas. Esta desarrollado en el stck MERN con Typescript, además de implementar estados globales con Zustand. La aplicación está estructurada utilizando una arquitectura por capas y orientada a features, lo que facilita la escalabilidad y el mantenimiento.

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

## Iniciar con NPM

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

## Imágenes del proyecto

<p align="center">
  <img src="https://github.com/PonchoCeniceros/app_de_tareas/blob/main/.imgs/01.png" width="500">
</p>

<p align="center">
  <img src="https://github.com/PonchoCeniceros/app_de_tareas/blob/main/.imgs/02.png" width="500">
</p>

<p align="center">
  <img src="https://github.com/PonchoCeniceros/app_de_tareas/blob/main/.imgs/03.png" width="500">
</p>
