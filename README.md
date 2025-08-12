# Gulp Exercício – SASS, Imagens e JS

## O que faz
- **Compilação de SASS** para CSS minificado (+ sourcemaps).
- **Compressão de imagens** em `src/images` para `dist/images`.
- **Minificação de JavaScript** para `dist/js` (+ sourcemaps).
- **Watch** automático para mudanças.

## Como usar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Ambiente de desenvolvimento com watch:
   ```bash
   npm run dev
   ```
3. Build completo (sem watch):
   ```bash
   npm run build
   ```

## Estrutura
```
src/
  scss/
    main.scss
  js/
    app.js
  images/
dist/
```

Coloque mais arquivos `.scss`, `.js` e imagens dentro das pastas acima que o Gulp cuida do resto.
