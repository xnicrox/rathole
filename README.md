# Rathole

Micro framework reactivo con Virtual DOM

## Features

| Modulo            | Funcionalidad                   | Descripción                                                          |
| ----------------- | ------------------------------- | -------------------------------------------------------------------- |
| **state**         | Reactividad                     | Actualizar componentes cuando cambia el estado o los datos.          |
| **virtualDOM**    | Virtual DOM                     | Sistema de diff granular que actualiza solo los elementos cambiados. |
| **render**        | Creación de Componentes         | Crear componentes personalizados para la aplicación.                 |
| **addEvent**      | Eventos                         | Gestionar eventos como clics, cambios, etc., en componentes.         |
| **router**        | Sistema de Enrutamiento         | Implementar enrutamiento para navegar entre vistas.                  |
| **renderIf**      | Renderizado Condicional         | Mostrar u ocultar componentes basados en condiciones.                |
| **data**          | Gestión de Datos                | Obtener, enviar y manipular datos en la aplicación.                  |
| **memoize**       | Memoización                     | Almacenar en caché resultados de funciones costosas.                 |
| **componentSize** | Tamaño y Número de Componentes  | Calcular el tamaño total y componentes.                              |
| **onPageLoad**    | Detección de Carga de la Página | Detectar cuando la página web se carga completamente.                |
| **stores**        | Implementación de "Stores"      | Crear un sistema para gestionar el estado global con subscripciones. |

## Virtual DOM

El módulo `virtualDOM` implementa un algoritmo de diff eficiente que:

-   ✅ **Actualiza solo lo necesario**: Compara atributos, texto y estructura del DOM
-   ✅ **Mantiene event listeners**: No reemplaza nodos innecesariamente
-   ✅ **Detecta cambios estructurales**: Reemplaza nodos cuando cambia el tipo de elemento
-   ✅ **Maneja hijos dinámicos**: Agrega, elimina y actualiza elementos hijo eficientemente
-   ✅ **Evita bucles infinitos**: Sistema de flags para prevenir re-renderizados innecesarios

### Uso básico

```javascript
import { virtualDOM } from './rathole'

// Establecer el árbol virtual
virtualDOM.setVirtualTree(htmlString, containerElement)

// Aplicar cambios al DOM
virtualDOM.commit()
```

### Ejemplos incluidos

-   **TabGallery**: Galería de imágenes con estado reactivo
-   **MeetTeam**: Tarjetas de equipo con stores y datos dinámicos
-   **NavBar**: Sistema de navegación con router

## Performance

dist/rathole.js 3.92 kB │ gzip: 1.70 kB

## Demo

-   <https://rathole.vercel.app/>

## Install

```bash
npm i
npm run dev
```

## Build

```bash
npm run build
```

## Estructura del Proyecto

```
rathole/
├── src/
│   ├── modules/          # Módulos del framework
│   │   ├── virtualDOM.js # Sistema de Virtual DOM
│   │   ├── state.js      # Gestión de estado
│   │   ├── stores.js     # Stores globales
│   │   ├── router.js     # Sistema de rutas
│   │   └── ...
│   ├── examples/         # Ejemplos de uso
│   │   ├── TabGallery/   # Galería de imágenes
│   │   ├── MeetTeam/     # Tarjetas de equipo
│   │   └── NavBar/       # Barra de navegación
│   └── rathole.js        # Exportaciones principales
├── public/               # Archivos estáticos
└── dist/                 # Build de producción
```

## Referencias

-   <https://picocss.com/>
