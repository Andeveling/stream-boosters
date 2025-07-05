## Despliegue del Formulario Personalizado en Hostinger

Para desplegar el formulario interactivo, sigue estos pasos:

1.  **Construir el proyecto:** Ejecuta `pnpm build` para generar la versión de producción en la carpeta `dist/`.
2.  **Subir los archivos:** Sube todo el contenido de la carpeta `dist/` al directorio raíz de tu hosting (normalmente `public_html`).
3.  **Verificar el script PHP:** Asegúrate de que el archivo `enviar_formulario.php` se encuentre en el mismo directorio que tu `index.html` en el servidor.
4.  **Actualizar el correo electrónico:** Antes de subir, abre `public/enviar_formulario.php` y reemplaza la dirección de correo `tu-correo@dominio.com` por la dirección real donde deseas recibir las propuestas.