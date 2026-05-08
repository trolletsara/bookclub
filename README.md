# 📚 Bokklubben

## För och efternamn:
Sara Nylander

## Projektbeskrivning:
En start till en sida för en bokklubb. Man kan spara ner böcker som man vill läsa och vilka man har läst. Det går också att recensera och betygsätta böckerna (sidan tillåter flera recensioner på en bok, så alla bokklubbsmedlemmar får säga sitt). 

## Vilket API du använt:
Projektet använder Google Books API för att hämta bokdata, inklusive titlar, författare, beskrivningar och omslagsbilder.
[Google Books API](https://developers.google.com/books)

## Instruktioner för att köra projektet:
Sök på böcker, spara ner dem som antingen "Vill läsa" eller "Har läst". Om du har läst en bok får du möjligheten att recensera den, spara recensionen. Om du sedan besöker den specifika bokens sida kan du redigera och rader din recension samt lägga till fler recensioner.

## Lista på implementerade features:
* Sökfunktion: Dynamisk sökning mot Google Books API med pagination (20 resultat per sida).

* Routing: Flera vyer (Hem/Sök, Läslista, Bokdetaljer) hanterade med react-router-dom.

* State Management: Global hantering av boklistor och recensioner via React Context API.

* Läslistor: Möjlighet att flytta böcker mellan "Vill läsa" och "Har läst".

* CRUD:
**Create:** Skriv nya recensioner med namn, betyg (1–5) och text.
**Read:** Visa alla recensioner för en specifik bok på dess detaljsida.
**Update:** Redigera befintliga recensioner via en smidig modal.
**Delete:** Radera oönskade recensioner.

* Persistence: All data (läslistor och recensioner) sparas i webbläsarens localStorage och finns kvar efter sidomladdning.

* Responsiv Design: Anpassad för både desktop och mobila enheter.

## Eventuella kända buggar eller begränsningar:
**API Rate Limiting (503 Error):** Vid mycket intensiv användning på kort tid kan Google Books API tillfälligt blockera anrop (Error 503). Appen hanterar detta genom att visa ett felmeddelande för användaren.

**Unika ID:n:** Recensioners ID genereras baserat på Date.now(), vilket fungerar utmärkt för lokal användning men skulle behöva ersättas av en databas-genererad UUID i en produktionsmiljö med flera användare.

**API-uppdatering:** Det går inte att skicka upp någon data till APIet, t.ex. recensionerna och betygsättningen. Som det ju ofta blir med pubklia APIer.