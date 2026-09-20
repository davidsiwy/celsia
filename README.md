# Dopřáno web (dříve Celsia)

Statický web, GitHub Pages servíruje kořen repa.

- `index.html` čeština, `en.html` angličtina
- `style.css` společné styly (design systém: bílé a černé sekce, modrý akcent `--blue`, nadpisy Unbounded, text Manrope, rádius 16 px, pill tlačítka)
- `script.js` konfigurátor, kalkulačka návratnosti, předvolba modelu z karet (`data-goto-model`), šipky karuselů (`data-scroll`), mobilní menu, klávesnice a `aria-pressed`
- Ceny, modely a texty konfigurátoru: objekt `window.CELSIA` (interní název proměnné, značka je Dopřáno) na konci každé HTML stránky (každý jazyk má vlastní)
- `img/` fotografie
- Značka: Dopřáno (doprano.cz, zatím na GitHub Pages). Logo: modrý kruh s bílou tečkou + „dopřáno" v Unbounded
- Formulář: FormSubmit na hello@gallerypoint.cz, vyměnit až bude doména. První odeslání vyžaduje potvrzení adresy.

## Sekce (shora dolů)

Hero → dva promo bannery → Modely (karty s půdorysy a cenou) → Často vás zajímá (bento) → Jak vypadá usazení + 4 kroky → 7 důvodů → Koncept + čísla → Co je uvnitř → Srovnání přístavba vs modul → Pro koho → Series 001 → Pro pronájem (kalkulačka) → Konfigurátor + V ceně → Garance → Otázky + Technika → patička.

## SEO

- `<head>`: title a description s klíčovými slovy, canonical, hreflang cs/en/x-default, Open Graph, Twitter card, robots
- JSON-LD v každé stránce: Organization (telefon), WebSite, WebPage, 4× Product s cenou v CZK, FAQPage (generuje se z FAQ sekce, při změně otázek přegenerovat)
- `sitemap.xml` (s hreflang a obrázky) a `robots.txt`
- Všechny obrázky mají popisný `alt`, rozměry a `loading="lazy"` (hero má `fetchpriority="high"`)
- Po nasazení: přidat web do Google Search Console a odeslat sitemap, jinak Google čeká na vlastní objevení

## Co doplnit, až bude

- Fotky: zatím jen dva rendery, používají se opakovaně (bento, důvody, zóny). Doplnit detaily kádě, sauny, recovery, usazení jeřábem.
- Video usazení do sekce „Jak vypadá usazení modulu".
- Reference a hodnocení, až budou první instalace.
- E-mail do patičky, až bude doména (telefon +420 602 175 653 už tam je).
