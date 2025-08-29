## Build & Deploy (moje poznámka)

> **Poznámka:** `dist` je pouze pro web – obsahuje obfuskovaný kód, aby se znesnadnilo čtení logiky v JS.  
> `src` je originální, čitelný kód pro úpravy a vývoj.

- [ ] Úpravy dělám vždy jen v **main/src**
- [ ] Hotový `script.js` nahraju do https://js-obfuscator.github.io/
- [ ] Zkopíruju obfuskovaný kód → uložím do **dist/script.js**
- [ ] Commit & push do větve **dist**
- [ ] Netlify nasazuje obsah z větve **dist**
- [ ] Do **dist** nikdy nesahám ručně jinak než vložením obfuskovaného souboru
