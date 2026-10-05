# Portfolio personal

Portfolio web de una sola app Angular, oscuro por defecto, con sidebar de iconos. Se despliega en GitHub Pages. Plan completo en [docs/PLAN.md](docs/PLAN.md).

La imagen de referencia solo inspira la estructura. No copiar colores, imágenes, logo ni textos de ella; la paleta y la identidad visual aún no están definidas.

## REGLA CRÍTICA: ramas
- Una rama por **tema**, no por tarea: `feat/base-styles` (todo lo de estilos), `feat/i18n`, `feat/layout-sidebar`, `feat/home`, `feat/projects`, etc. No crear una rama nueva por cada cambio pequeño.
- Si el trabajo pertenece a un tema que ya tiene rama, **reutilizar esa rama**: `git switch <rama>` y `git merge --ff-only develop` (tras `git pull` en `develop`) para actualizarla. Solo se crea rama nueva (desde `develop`) cuando es un tema nuevo.
- Nunca trabajar directamente en `develop` ni `main`. Antes de empezar, comprobar que no hay cambios sin commitear de otro tema.
- **Prohibido hacer commits y abrir PRs**: solo se gestionan las ramas. El usuario hace commit, PR y merge.
- Al cerrar un trabajo, dar al usuario el título del commit: una sola línea, en inglés, Conventional Commits (`feat(scope): ...`).

## Stack
- Angular 22 (standalone, signals), TypeScript estricto
- Tailwind CSS 4 (`@import 'tailwindcss'` en `src/styles.css`)
- i18n en runtime con Transloco; idiomas `es` (por defecto) y `en`
- pnpm, Vitest (`ng test`), Prettier

## Comandos
- `pnpm start` servidor de desarrollo
- `pnpm build` build de producción
- `pnpm test` tests
- `pnpm exec prettier --write .` formatear

## Estructura
- `src/app/core/` servicios singleton (idioma, tema, estado del sidebar)
- `src/app/layout/` shell y sidebar
- `src/app/features/<sección>/` home, about, projects, contact (lazy con `loadComponent`)
- `src/app/shared/` UI reutilizable, directivas, modelos
- `src/app/data/` datos tipados (proyectos, skills); los textos van en i18n
- `public/i18n/{es,en}.json` traducciones, `public/cv/` PDFs, `public/images/`

## Reglas de código
- Componentes standalone, `ChangeDetectionStrategy.OnPush`, sin NgModules.
- Estado con `signal`/`computed`/`effect`; RxJS solo para flujos asíncronos reales.
- `inject()` en lugar de inyección por constructor; `input()`/`output()` en lugar de decoradores.
- Control flow nuevo (`@if`, `@for` con `track`, `@switch`); nada de `*ngIf`/`*ngFor`.
- Rutas lazy; una carpeta por feature con `nombre.ts` y `nombre.html`.
- Archivos en kebab-case; clases en PascalCase; selectores con prefijo `app-`.
- TypeScript: sin `any`, tipos/interfaces en `shared/models`.
- Comentarios solo cuando el porqué no es obvio.

## Estilos (reglas estrictas)
- Todo el estilo vive en `src/styles/` y se reutiliza por tipo: `base/` (theme, reset, typography, fonts), `components/` (button, card, tag, link...), `layout/` (container, section, stack, grid). `src/styles.css` es el único punto de entrada.
- **Prohibido** en componentes: `styleUrl`/archivos `.css` propios, `style=""`, `<style>`, y cadenas largas de utilidades de Tailwind en las plantillas.
- Las plantillas usan clases semánticas (`btn btn-primary`, `card`, `tag`, `section`, `stack`, `heading-1`). Variantes por modificador.
- Si falta un estilo, se añade al archivo de su tipo; no se parchea en el componente.
- Colores, espacios, radios, sombras y tamaños salen siempre de tokens (`@theme` en `base/theme.css`); nada de valores sueltos.
- Fuentes: Open Sans para el cuerpo, fuente de lectura distinta para títulos (provisional: Lora), por tokens `--font-body`/`--font-heading`/`--font-mono`; auto-alojadas con `@fontsource`.

## i18n
- Ningún texto visible hardcodeado: todo vía clave de Transloco (`'seccion.clave'`).
- Toda clave nueva se añade en `es.json` **y** `en.json` a la vez, con la misma estructura.
- Rutas con prefijo de idioma `/:lang` (`es` | `en`); idioma por defecto `es`.

## Tema (dark mode)
- Clase `dark` en `<html>`, oscuro por defecto; respeta `prefers-color-scheme` en la primera visita y persiste en localStorage.
- Paleta por defecto: rojo + azul, id `red-blue` (rojo primario + azul secundario, intensos pero no oscuros; sin pasteles) sobre neutros fríos. Cada paleta son dos escalas `--primary-50..900` y `--secondary-50..900` (la 500 es el relleno, 600+ texto/enlaces). Los componentes usan solo tokens semánticos (`--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-primary`, `--color-secondary`, `--color-border`...), nunca nombres de color ni escalas directas.
- El usuario puede cambiar de paleta (`PaletteService`, atributo `data-palette` en `<html>`, guardada en localStorage). Una paleta nueva = un bloque `[data-palette='id']` en `styles/base/palettes.css` + una entrada en `PALETTES`; el texto blanco sobre `--primary-500`/`--secondary-500` y el texto de enlaces deben cumplir contraste AA (~4.5:1).
- Etiquetas: `.tag` (estilo ticket con muescas) con `tag-primary`/`tag-secondary`.
- Comprobar contraste en ambos temas.

## Sidebar
- Iconos centrados verticalmente; modo fijado vs auto-ocultar (se despliega al acercar el cursor o con foco de teclado).
- El estado `pinned` vive en un servicio con signal y se persiste en localStorage.
- En móvil se usa menú hamburguesa (`aria-expanded`, cierra con Esc y al navegar); no hay modo fijado.

## Contenido
- Contacto: solo enlaces (email y redes); sin formularios ni backend.
- Proyectos: lista + detalle `/:lang/projects/:slug`. Datos tipados en `src/app/data/`, textos en i18n. Detalle breve y verificable (resumen, problema, rol, 3–4 highlights, stack, enlaces); sin métricas ni logros inventados ni exageraciones.

## Despliegue (GitHub Pages)
- Merge/push a `main` despliega vía GitHub Actions (`deploy.yml`); en PRs hacia `main` corre solo `ci.yml` (build + tests). Pages con Source = GitHub Actions.
- Build con `--base-href /<repo>/`; copiar `index.html` a `404.html` para el fallback SPA; incluir `.nojekyll`.
- No usar rutas absolutas a assets (`/img/..`); deben respetar el base href.
- Deploy por GitHub Actions (`pnpm`, build, `actions/deploy-pages`).

## Accesibilidad y calidad
- HTML semántico, `aria-label` en botones solo-icono, foco visible, navegación por teclado, respeta `prefers-reduced-motion`.
- Imágenes con `alt` traducido y `NgOptimizedImage` cuando aplique.
- Presupuestos de build de `angular.json` deben pasar; no subir el límite sin motivo.

## Git
- Ramas: `main` (estable, despliega), `develop` (integración), ramas de tema desde `develop`. El usuario hace los commits (Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`) y los PRs.
