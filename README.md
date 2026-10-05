# Portfolio

Portfolio personal construido con Angular 22, Tailwind CSS 4 y Transloco (español e inglés). Se despliega en GitHub Pages.

Las reglas del proyecto y la estructura están en [CLAUDE.md](CLAUDE.md).

## Desarrollo

```bash
pnpm install
pnpm start        # http://localhost:4200
pnpm test         # tests con Vitest
pnpm build        # build de producción en dist/
```

## Despliegue

Un push o merge a `main` publica el sitio con GitHub Actions (`.github/workflows/deploy.yml`). Los PR hacia `main` ejecutan tests y build (`ci.yml`).
