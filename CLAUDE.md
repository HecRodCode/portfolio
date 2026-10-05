# Portfolio personal

Portfolio web de una sola app Angular, oscuro por defecto, con sidebar de iconos. Plan completo en [docs/PLAN.md](docs/PLAN.md).

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
- Rutas lazy; una carpeta por feature con `nombre.ts`, `nombre.html`, `nombre.css` (o Tailwind en plantilla).
- Estilos con clases de Tailwind y tokens (variables CSS) definidos en `src/styles/`; no colores hardcodeados en componentes.
- Archivos en kebab-case; clases en PascalCase; selectores con prefijo `app-`.
- TypeScript: sin `any`, tipos/interfaces en `shared/models`.
- Comentarios solo cuando el porqué no es obvio.

## i18n
- Ningún texto visible hardcodeado: todo vía clave de Transloco (`'seccion.clave'`).
- Toda clave nueva se añade en `es.json` **y** `en.json` a la vez, con la misma estructura.
- Rutas con prefijo de idioma `/:lang` (`es` | `en`); idioma por defecto `es`.

## Tema (dark mode)
- Clase `dark` en `<html>`, oscuro por defecto; respeta `prefers-color-scheme` en la primera visita y persiste en localStorage.
- Usar variantes `dark:` de Tailwind y tokens semánticos; comprobar contraste en ambos temas.

## Sidebar
- Iconos centrados verticalmente; modo fijado vs auto-ocultar (se despliega al acercar el cursor o con foco de teclado).
- El estado `pinned` vive en un servicio con signal y se persiste en localStorage.

## Accesibilidad y calidad
- HTML semántico, `aria-label` en botones solo-icono, foco visible, navegación por teclado, respeta `prefers-reduced-motion`.
- Imágenes con `alt` traducido y `NgOptimizedImage` cuando aplique.
- Presupuestos de build de `angular.json` deben pasar; no subir el límite sin motivo.

## Git
- Ramas: `main` (estable), `develop` (trabajo). Commits con Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
