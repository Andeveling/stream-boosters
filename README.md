# Stream Boosters 🚀

Landing page desarrollada con [Astro](https://astro.build/) para conectar videojuegos y marcas con streamers activos en Twitch y otras plataformas. Publicidad directa, sin intermediarios, con resultados reales y visibilidad auténtica.

---

## ✨ Características

- **Arquitectura modular:** Cada sección es un componente Astro independiente.
- **Responsive:** Diseño adaptado a móviles y desktop.
- **Animaciones suaves:** Experiencia visual atractiva.
- **SEO optimizado:** Meta tags y estructura accesible.
- **Navegación ancla:** Header fijo con scroll suave entre secciones.

---

## 📁 Estructura del Proyecto

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   └── sections/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── package.json
└── README.md
```

---

## 🚦 Comandos principales

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando        | Acción                                              |
| -------------- | --------------------------------------------------- |
| `pnpm install` | Instala las dependencias                            |
| `pnpm dev`     | Inicia el servidor de desarrollo (`localhost:4321`) |
| `pnpm build`   | Genera la versión de producción en `./dist/`        |
| `pnpm preview` | Previsualiza el sitio generado                      |

---

## 🛠️ Entorno local para pruebas Astro + PHP (simil Hostinger)

### 1. Build y copia de archivos PHP

- Ejecuta `pnpm build:local` para:
  - Limpiar la carpeta `dist/`.
  - Generar el build estático de Astro.
  - Copiar los archivos PHP desde `src/php/` a `dist/`.

### 2. Probar con servidor PHP embebido

- Desde la raíz del proyecto, ejecuta:
  ```bash
  php -S localhost:8080 -t dist
  ```
- Accede a `http://localhost:8080` para probar el sitio con PHP como en Hostinger.

### 3. Probar con XAMPP (igual que Hostinger)

- Ejecuta el script:
  ```bash
  pnpm copy:xampp
  ```
- Esto copia todo el contenido de `dist/` a `/opt/lampp/htdocs/stream-boosters/`.
- Inicia XAMPP y accede a `http://localhost/stream-boosters`.
- **Nota:** Puede requerir permisos de superusuario (`sudo`).

### 4. Scripts útiles

| Comando            | Acción                                                       |
| ------------------ | ------------------------------------------------------------ |
| `pnpm clean`       | Borra la carpeta `dist/`                                     |
| `pnpm build:local` | Build Astro + copia PHP a `dist/`                            |
| `pnpm copy:xampp`  | Copia `dist/` a XAMPP (`/opt/lampp/htdocs/stream-boosters/`) |

### 5. Notas

- Asegúrate de que los archivos PHP estén en `src/php/` para ser copiados.
- Si usas rutas absolutas en PHP, revisa que funcionen igual en Hostinger y XAMPP.
- Si necesitas permisos, antepone `sudo` al comando de copia.

---

## 📚 Recursos

- [Documentación Astro](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/)
- [Discord de Astro](https://astro.build/chat)

---

## 📝 Licencia

MIT

---
