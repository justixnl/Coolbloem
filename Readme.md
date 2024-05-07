# Coolbloem
Een eenvoudig ontwerp van een intranet gemaakt voor het bedrijf Coolbloem. 

De frontend bestaat uit 3 pagina's. 

- Een index die functioneert als homepagina
- een nieuwspagina waar je laatste nieuws kan bekijken en toevoegen
- een smoelenboek/personeels pagina met de mogelijkheid om nieuwe leden toe te voegen.

#### Afhandling bestanden
Deze handelingen worden uitgevoerd op de achtergrond door een nep-backend/api die is opgezet in Express.

Hierdoor is er de mogelijkheid om foto's te uploaden (naar je lokale folder via fs) en de JSON bestanden, die worden gebruikt als nep data, voor de backend bij te werken.

# Installatie

Installatie is erg simpel:

1. Type `npm install` in je terminal en run deze command
2. Daarna kan je het project draaien door `npm run dev` uit te voeren in je terminal.

Dit zorgt ervoor dat de Vite (frontend) in samenwerken met Express (backend) draait.

## Frontend
Je kan de javascript files vinden onder `src/js`. Plaatjes voor het nieuws en de avatars kan je vinden onder `src/assets/images`

## Backend
Api settings kunnen worden teruggevonden in de server folder in het bestand `main.js`.
Wil je de endpoint data aanpassen? Dit kan in de daarvoor aangeleverde JSON files in dezelfde folder
`nieuws.json` en `smoelenboek.json`. 

Onder `src/io` staan de orginele bestanden waar niks mee wordt gedaan.

## Dependencies

Deze omgeving maakt gebruik van de volgende packages:
| Package        | Version           | Description  |
| ------------- |:-------------:| -----:|
| [Vite-Express](https://www.npmjs.com/package/vite-express) | laatste versie | Dit zorgt ervoor dat Express makelijk met Vite werkt |
| [Express](https://www.npmjs.com/package/express) | 4.18.2 |   Zorgt voor fake backend met API endpoints |
| [Express-fileupload](https://www.npmjs.com/package/express-fileupload) | 1.5.0 | Middleware voor Express om files te uploaden |
| [Cross-env](https://www.npmjs.com/package/cross-env) | 7.0.3 | Utility tool voor ENV variables in windows  |
| [DOMPurify](https://www.npmjs.com/package/dompurify) | 3.1.2 | DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG  |


