# 6402+ | Semillas de Memoria

Este es el sitio web del proyecto memorial 6402+, que honra la memoria de las víctimas de los falsos positivos en Colombia.

## Características

- Sitio web estático con HTML, CSS y JavaScript
- Sistema de internacionalización (i18n) con jQuery.i18n y Universal Language Selector (ULS)
- Soporte para múltiples idiomas: Español, Inglés y Portugués
- Diseño responsivo con Bootstrap 5

## Configuración del Entorno de Desarrollo

### Requisitos Previos

- Node.js (v14 o superior)
- npm (incluido con Node.js)
- Un navegador web moderno

### Instalación

1. Clone el repositorio:
```bash
git clone https://github.com/danielyepezgarces/6402-project.git
cd 6402-project
```

2. Instale las dependencias:
```bash
npm install
```

Las dependencias instaladas incluyen:
- `jquery` - Biblioteca JavaScript
- `@wikimedia/jquery.i18n` - Sistema de internacionalización de Wikimedia
- `jquery.uls` - Universal Language Selector de Wikimedia

### Estructura del Proyecto

```
6402-project/
├── Css/                    # Estilos CSS
├── EN/                     # Versión en inglés (legacy)
├── Img/                    # Imágenes
├── Js/                     # Scripts JavaScript
│   ├── menu.js            # Menú de navegación
│   ├── footer.js          # Footer
│   ├── i18n-config.js     # Configuración de i18n
│   └── ...                # Otros scripts
├── i18n/                   # Archivos de traducción
│   ├── es.json            # Traducciones en español
│   ├── en.json            # Traducciones en inglés
│   └── pt.json            # Traducciones en portugués
├── libs/                   # Bibliotecas distribuidas
│   ├── jquery.min.js
│   ├── jquery.i18n.*.js
│   └── jquery.uls.*.js
├── index.html              # Página principal
├── package.json            # Configuración de npm
└── README.md              # Este archivo
```

## Sistema de Internacionalización (i18n)

### Visión General

El proyecto utiliza el sistema de internacionalización de Wikimedia que incluye:
- **jQuery.i18n**: Para manejar las traducciones de la interfaz
- **Universal Language Selector (ULS)**: Para que los usuarios cambien de idioma fácilmente

### Idiomas Soportados

- **Español (es)**: Idioma predeterminado
- **Inglés (en)**: Traducción completa
- **Português (pt)**: Traducción completa

### Cómo Funciona

1. **Archivos de Traducción**: Los mensajes traducidos se almacenan en archivos JSON en el directorio `i18n/`
2. **Atributos data-i18n**: Los elementos HTML utilizan atributos `data-i18n` para marcar el contenido traducible
3. **Inicialización Automática**: El sistema se inicializa automáticamente al cargar la página
4. **Persistencia**: El idioma seleccionado se guarda en localStorage del navegador

### Agregar Nuevas Traducciones

#### 1. Agregar un Nuevo Mensaje

Edite los archivos JSON en el directorio `i18n/`:

**i18n/es.json:**
```json
{
  "nuevo-mensaje": "Texto en español"
}
```

**i18n/en.json:**
```json
{
  "new-message": "Text in English"
}
```

**i18n/pt.json:**
```json
{
  "nova-mensagem": "Texto em português"
}
```

#### 2. Usar el Mensaje en HTML

Agregue el atributo `data-i18n` al elemento HTML:

```html
<p data-i18n="nuevo-mensaje">Texto en español</p>
```

Para contenido con HTML interno:
```html
<p data-i18n="nuevo-mensaje" data-i18n-html>Texto con <strong>HTML</strong></p>
```

Para atributos de placeholder:
```html
<input data-i18n-placeholder="placeholder-key" placeholder="Placeholder text">
```

Para atributos de title:
```html
<button data-i18n-title="tooltip-key" title="Tooltip text">Button</button>
```

#### 3. Usar Traducciones en JavaScript

```javascript
// Obtener una traducción
var mensaje = $.i18n('nuevo-mensaje');

// Cambiar el idioma
window.i18nConfig.updateLanguage('en');

// Obtener el idioma actual
var idiomaActual = window.i18nConfig.getCurrentLanguage();
```

### Agregar un Nuevo Idioma

1. Cree un nuevo archivo JSON en `i18n/` (ej: `i18n/fr.json`)
2. Copie la estructura de `i18n/es.json` y traduzca los mensajes
3. Actualice `Js/i18n-config.js` agregando el nuevo idioma a `SUPPORTED_LANGUAGES`:

```javascript
const SUPPORTED_LANGUAGES = {
    'es': 'Español',
    'en': 'English',
    'pt': 'Português',
    'fr': 'Français'  // Nuevo idioma
};
```

4. Actualice la carga de archivos en la función `initI18n()`:

```javascript
.load({
    'es': I18N_PATH + '/es.json',
    'en': I18N_PATH + '/en.json',
    'pt': I18N_PATH + '/pt.json',
    'fr': I18N_PATH + '/fr.json'  // Nuevo idioma
});
```

## Selector de Idioma

El selector de idioma aparece automáticamente en la barra de navegación. Los usuarios pueden:
1. Hacer clic en el botón de traducción (ícono 🌐)
2. Seleccionar su idioma preferido
3. La interfaz se actualiza inmediatamente
4. La selección se guarda para futuras visitas

## Desarrollo Local

Para trabajar en el proyecto localmente:

1. Inicie un servidor web local. Puede usar cualquiera de estos:

   **Con Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Con Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Con PHP:**
   ```bash
   php -S localhost:8000
   ```

2. Abra su navegador en `http://localhost:8000`

3. Los cambios en los archivos HTML, CSS o JS se reflejarán al recargar la página

## Pruebas

Para probar la funcionalidad de i18n:

1. Abra `index.html` en un navegador
2. Verifique que el contenido se muestre en español (idioma predeterminado)
3. Haga clic en el selector de idioma en la barra de navegación
4. Cambie a inglés o portugués
5. Verifique que todo el contenido traducible se actualice
6. Recargue la página y verifique que el idioma seleccionado persista

## Despliegue

El sitio es estático y puede ser desplegado en cualquier servidor web o servicio de hosting estático:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Cualquier servidor web tradicional (Apache, Nginx, etc.)

Simplemente copie todos los archivos al directorio raíz del servidor web.

## Contribuir

Para contribuir al proyecto:

1. Fork el repositorio
2. Cree una rama para su característica (`git checkout -b feature/nueva-caracteristica`)
3. Realice sus cambios
4. Commit sus cambios (`git commit -am 'Agregar nueva característica'`)
5. Push a la rama (`git push origin feature/nueva-caracteristica`)
6. Cree un Pull Request

## Solución de Problemas

### Las traducciones no se cargan

- Verifique que los archivos JSON en `i18n/` estén bien formateados (use un validador JSON)
- Asegúrese de que el servidor web pueda servir archivos JSON
- Revise la consola del navegador para errores de carga

### El selector de idioma no aparece

- Verifique que jQuery esté cargado antes de los scripts de i18n
- Asegúrese de que todos los archivos de la biblioteca ULS estén cargados
- Revise la consola del navegador para errores de JavaScript

### Las traducciones no persisten

- Verifique que localStorage esté habilitado en el navegador
- Algunos navegadores bloquean localStorage en modo privado/incógnito

## Recursos Adicionales

- [jQuery.i18n Documentation](https://github.com/wikimedia/jquery.i18n)
- [Universal Language Selector](https://github.com/wikimedia/jquery.uls)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.2/)

## Licencia

Este proyecto está licenciado bajo la licencia especificada por los propietarios del proyecto.

## Contacto

Para preguntas o sugerencias sobre el proyecto 6402+, por favor contacte al equipo de desarrollo.
