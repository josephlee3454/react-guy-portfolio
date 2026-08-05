# Assets

Images live here. Anything in `public/` is served from the site root, so
`public/assets/portrait.jpg` is referenced as `/assets/portrait.jpg`.

```
public/assets/
  portrait.jpg      hero + about photo, 800x1100
  projects/         case-study screenshots (empty — none shot yet)
```

## Why `public/`, not `src/assets/`

Both are valid in Next, and they are not interchangeable:

- **`public/`** — served as static files, referenced by URL string. Required for
  anything used as a CSS `background-image`.
- **`src/assets/`** — imported into JS, hashed and optimised by `next/image`.
  Gives automatic WebP/AVIF conversion, correct `width`/`height`, and blur
  placeholders.

This project uses `public/` because the two images that exist are both CSS
backgrounds, not `<img>` elements. The hero portrait carries a gradient
`mask-image` and an `::after` overlay (DESIGN_SPEC §3), and the project shots
have to degrade to a bare gradient when no screenshot exists — neither is
expressible through `next/image`.

If a plain content image is ever added — an `<img>` with no masking — put it in
`src/assets/` and use `next/image` instead. The optimisation is worth it and
costs nothing there.

## Known gaps

- **`portrait.jpg` should be WebP.** DESIGN_SPEC §4 asks for WebP with explicit
  `width`/`height` to avoid layout shift. No encoder was available when this was
  added; `brew install webp` then
  `cwebp -q 82 portrait.jpg -o portrait.webp`, and update the two `/assets/`
  references in `src/content/home.ts` and `src/content/about.ts`.
- **`projects/` is empty.** Every project shot is still a CSS gradient
  placeholder. Real screenshots need the same cross-process grade as the
  portrait (teal shadows, acid highlights, hard contrast, film grain) or the
  tiles will look mismatched — see DESIGN_SPEC §4.
