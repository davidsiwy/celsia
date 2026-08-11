# CELSIA°

Prefabrikované wellness moduly. Sauna, ledová káď, recovery. Statický web pro GitHub Pages.

Live: https://davidsiwy.github.io/celsia/

## Úpravy

- Ceny a opce: objekt `PRICING` na začátku `<script>` bloku v `index.html`. Ceny modelů, příplatky opcí a opláštění se mění tam, konfigurátor i souhrn se přepočítají samy.
- Texty: přímo v HTML, sekce jdou po `<section id="...">`.
- Poptávkový formulář: FormSubmit, zatím míří na `hello@gallerypoint.cz`. Až bude doména, vyměnit adresu v atributu `action` formuláře `#leadform`. První odeslání vyžaduje potvrzení adresy e‑mailem od FormSubmit.
- Barvy a fonty: CSS proměnné v `:root`.

## Poznámky

- Ceny jsou vč. DPH, kalkulované na cca 50% marži u modelů Studio a Grand. Podklad v interní kalkulaci, před spuštěním kampaní potvrdit výrobní náklady s Robertem.
- Fotky zatím nejsou, hero je typografický. Až budou rendery z Gemini, patří do hero a ke každému modelu.
