## Build & Deploy (moje poznámka)

> **Poznámka:** `main` je pouze pro web – obsahuje obfuskovaný kód, aby se znesnadnilo čtení logiky v JS.  
> `src` je originální, čitelný kód pro úpravy a vývoj.

- [ ] Úpravy dělám vždy jen v **src/main**
- [ ] Hotový `script.js` nahraju do https://js-obfuscator.github.io/
- [ ] Zkopíruju obfuskovaný kód → uložím do **main/script.js**
- [ ] Commit & push do větve **main**
- [ ] Netlify nasazuje obsah z větve **main**
- [ ] Do **main** nikdy nesahám ručně jinak než vložením obfuskovaného souboru
