# PROJECT WRITING GUIDE

Linee guida per descrivere nuovi progetti nel portfolio in modo chiaro, concreto e utile a recruiter, tecnici e collaboratori.

## Obiettivo
- Far capire rapidamente cosa fa il progetto, perche esiste e quale problema risolve.
- Mostrare il tuo ruolo tecnico e decisionale, non solo lo stack usato.
- Rendere visibili risultati, vincoli, compromessi e crescita tecnica.
- Mantenere coerenza tra scheda breve, pagina dettaglio e versioni IT/EN.

## Principio Editoriale
Scrivi come uno sviluppatore che sa spiegare il proprio lavoro:
- concreto, non promozionale
- personale, ma professionale
- tecnico, ma leggibile anche da chi non conosce ogni libreria
- orientato a problemi, scelte e risultati

Formula base:

```txt
Ho costruito [cosa] per [utente/scopo], risolvendo [problema concreto] tramite [scelta tecnica o di prodotto], con [risultato o apprendimento].
```

## Scheda Progetto
La descrizione breve visibile nella lista progetti deve stare idealmente in una frase.

Deve rispondere a:
- cosa e il progetto
- per chi o per quale uso e pensato
- quale problema o workflow migliora
- quale tratto tecnico lo rende interessante

Buona struttura:

```txt
[Tipo di app] per [scopo/workflow], costruita con [scelta tecnica principale] per [beneficio concreto].
```

Esempio debole:

```txt
Applicazione moderna realizzata con React, Node.js e MongoDB.
```

Esempio migliore:

```txt
Web app personale per gestire backlog e progressi di gioco, progettata attorno a filtri, stati e sincronizzazione dati del mio workflow reale.
```

## Pagina Dettaglio
Ogni pagina progetto dovrebbe mantenere questa progressione narrativa.

## Introduzione
Obiettivo: dare contesto prima della tecnologia.

Include:
- perche hai creato il progetto
- quale problema o bisogno risolve
- quali vincoli avevi
- cosa rende il progetto diverso da una demo generica

Evita:
- liste di tecnologie senza contesto
- frasi come "progetto moderno e intuitivo" se non spieghi in che senso
- descrizioni troppo astratte del tipo "migliora l'esperienza utente"

## Sfide Affrontate
Le sfide devono essere problemi reali, non categorie generiche.

Buoni esempi:
- "Mantenere coerenti route, breadcrumb e contenuti tradotti senza duplicare configurazione."
- "Gestire dati statici aggiornati da CI evitando chiamate runtime non necessarie."
- "Rendere una preview live utile senza rallentare il caricamento iniziale."

Esempi da migliorare:
- "Gestire la complessita del progetto."
- "Rendere il codice pulito."
- "Creare una buona UI."

## Soluzioni e Meccaniche
Quando descrivi una scelta tecnica, collega sempre tecnologia e motivo.

Formato consigliato:

```txt
[Tecnologia/scelta] e stata usata per [responsabilita concreta], perche [trade-off o beneficio].
```

Esempio:

```txt
MiniSearch gestisce la ricerca lato client per mantenere risposte immediate e ridurre dipendenze server-side.
```

Non fermarti a:

```txt
Il progetto usa MiniSearch.
```

## Cosa Ho Imparato
Le lezioni devono essere trasferibili ad altri progetti.

Buoni focus:
- architettura
- debugging
- UX
- deploy
- i18n
- dati e contratti API
- collaborazione con AI e verifica critica

Scrivi lezioni come crescita professionale, non come diario.

Esempio:

```txt
Ho imparato a separare dati statici, view model e UI per rendere piu semplice aggiungere nuovi progetti senza toccare la logica di rendering.
```

## Tecnologie
Per ogni tecnologia, spiega il ruolo nel progetto.

Checklist:
- React: quale parte dell'interfaccia rende modulare?
- Router: quale navigazione o stato pagina semplifica?
- Backend/API: quali flussi serve?
- Database: quali dati modella e perche quel modello e adatto?
- CI/CD: quale rischio manuale riduce?
- AI tooling: quale parte del workflow ha accelerato e come hai verificato il risultato?

Evita descrizioni intercambiabili tra progetti. Se una frase potrebbe stare identica in tre progetti diversi, va resa piu specifica.

## Roadmap
La roadmap deve raccontare evoluzione reale o pianificata con buon senso.

Preferisci:
- milestone gia raggiunte
- miglioramenti chiari e verificabili
- prossimi passi realistici

Evita:
- promesse troppo grandi
- feature scollegate dal valore del progetto
- roadmap usata solo come elenco di desideri

## Stile IT/EN
Le versioni italiana e inglese devono essere coerenti nel significato, non traduzioni parola per parola.

Regole pratiche:
- italiano: naturale, diretto, senza burocratese
- inglese: chiaro, attivo, senza gonfiare troppo i risultati
- mantieni stessa intenzione, stesso livello di dettaglio e stessi concetti tecnici
- controlla sempre `npm run i18n:check` dopo modifiche alle chiavi

## Pattern da Migliorare
Quando rivedi contenuti esistenti, cerca queste occasioni.

## Riduci Frasi Generiche
Da:

```txt
Interfaccia chiara, moderna e accessibile.
```

A:

```txt
Interfaccia organizzata intorno a card, filtri e stati visibili per rendere rapido il controllo del backlog.
```

## Trasforma Stack in Decisioni
Da:

```txt
Ho usato React, MUI e Vite.
```

A:

```txt
React e MUI hanno permesso di separare layout, componenti riutilizzabili e stati UI, mentre Vite ha ridotto i tempi di iterazione durante le modifiche visive.
```

## Mostra Vincoli e Trade-Off
Da:

```txt
Ho implementato il deploy.
```

A:

```txt
Ho strutturato il deploy su VPS con workflow versionati per ridurre passaggi manuali e rendere i rollback piu prevedibili.
```

## Checklist Nuovo Progetto
Prima di aggiungere un progetto al portfolio, verifica:
- la card spiega valore e scopo in una frase
- l'introduzione non parte dallo stack, ma dal problema
- ogni tecnologia ha un ruolo specifico
- le sfide sono concrete e verificabili
- le lezioni mostrano crescita trasferibile
- la roadmap e realistica
- IT e EN sono allineati per contenuto e tono
- `projects.js` ha `id`, categoria, CTA, preview, GitHub/live URL coerenti
- le chiavi i18n sono presenti in entrambe le lingue

## Mini Template
Usa questo schema quando prepari un nuovo progetto.

```txt
Card:
[Tipo progetto] per [scopo], pensato per [workflow/utente], con [scelta tecnica distintiva].

Introduzione:
Ho creato questo progetto per...
Il problema principale era...
La soluzione si concentra su...

Sfide:
- [Problema concreto]
- [Vincolo tecnico/prodotto]
- [Trade-off]

Soluzioni:
- [Scelta] -> [perche]
- [Scelta] -> [beneficio]

Cosa ho imparato:
- [Lezione trasferibile]
- [Miglioramento tecnico/personale]

Roadmap:
- v1: base funzionante
- v2: miglioramento chiave
- v3: evoluzione realistica
```
