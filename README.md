# Celsia web

Statický web, GitHub Pages servíruje kořen repa.

- `index.html` čeština, `en.html` angličtina
- Světlý design, styly jsou inline v HTML (tak je exportuje návrhový nástroj, ať se to při dalším exportu netluče)
- Responsivita: `<style>` blok v `<head>` + atributy `data-m` na prvcích (`stack`, `stack2`, `stats`, `trow`, `zona`, `nav`, `hide`, `unstick`, `cta`), breakpointy 1040 a 760 px
- `script.js` konfigurátor, kalkulačka návratnosti, hover stavy, klávesnice (Enter / mezerník) a `aria-pressed`
- Ceny, modely a texty konfigurátoru: objekt `window.CELSIA` na konci každé HTML stránky (každý jazyk má vlastní)
- `img/` fotografie
- Formulář: FormSubmit na hello@gallerypoint.cz, vyměnit až bude doména. První odeslání vyžaduje potvrzení adresy.

## Pozor při dalším exportu z návrhu

Export přepíše `index.html`, `en.html` i `script.js`. Co je potřeba po exportu vrátit:

1. `<title>` bez stupně (logotyp je "celsia", ne "CELSIA°")
2. V `script.js` funkce `activate()` a `setPressed()` — dodávají konfigurátoru `role="button"`, `tabindex`, klávesnici a `aria-pressed`
