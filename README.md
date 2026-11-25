# KI News – React Frontend

Weboberfläche zum Lesen von KI-Nachrichten, gruppiert nach Datum. Nachrichten werden über eine separate HTTP-API geladen und mit Überschrift, Zusammenfassung, ausführlichem Inhalt und Link zur Originalquelle angezeigt.

Dieses Repository enthält ausschließlich das Frontend. Die Bereitstellung und Aufbereitung der Nachrichten erfolgt außerhalb dieser Anwendung.

## Funktionen

- Navigation zwischen verfügbaren Nachrichtentagen
- Aufklappbare Nachrichten mit Zusammenfassung und ausführlichem Inhalt
- Verlinkung der Originalquelle mit Anzeige der Quelldomain
- Lade- und Fehleranzeigen
- Datenabruf und Caching mit RTK Query
- Docker-Build mit Auslieferung der statischen Dateien über nginx

## Tech-Stack

| Bereich | Technologie |
| --- | --- |
| Benutzeroberfläche | React |
| Sprache | TypeScript |
| Entwicklungsserver und Build | Vite |
| Zustandsverwaltung | Redux Toolkit und React Redux |
| API-Anbindung und Caching | RTK Query |
| Datenschemata und Validierungshelfer | ArkType |
| Linting | Oxlint |
| Formatierung | Prettier |
| Container | Docker und nginx |

## Voraussetzungen

Für die lokale Entwicklung:

- Node.js und npm, kompatibel mit den Versionen in `package-lock.json`
- Eine erreichbare Backend-API mit den unten beschriebenen Endpunkten

Für die containerisierte Ausführung:

- Docker

Das Dockerfile verwendet derzeit `node:20-alpine` für den Build und `nginx:stable-alpine` für die Auslieferung.

## Lokal starten

### 1. Repository klonen

```bash
git clone [https://github.com/kaiboerner/ki-news-react-frontend.git](https://github.com/kaiboerner/ki-news-react-frontend.git)
cd ki-news-react-frontend
```

### 2. Abhängigkeiten installieren

```bash
npm ci
```

### 3. API konfigurieren

Im Projektverzeichnis eine Datei `.env.local` anlegen:

```dotenv
VITE_API_URL=http://localhost:3000
```

Die Adresse ist ein Beispiel. Sie muss auf die Basis-URL der tatsächlichen Backend-API zeigen.

Das Frontend hängt daran die Pfade `/dates` beziehungsweise `/<datum>` an. Enthält die API-Adresse einen Präfix, gehört dieser ebenfalls in die Variable:

```dotenv
VITE_API_URL=[https://api.example.com/ki-news](https://api.example.com/ki-news)
```

Daraus ergeben sich beispielsweise folgende Anfragen:

```text
[https://api.example.com/ki-news/dates](https://api.example.com/ki-news/dates)
[https://api.example.com/ki-news/2026-11-25](https://api.example.com/ki-news/2026-11-25)
```

### 4. Entwicklungsserver starten

```bash
npm run dev
```

Die lokale Adresse wird im Terminal ausgegeben.

## Konfiguration

| Variable | Bedeutung |
| --- | --- |
| `VITE_API_URL` | Basis-URL der Nachrichten-API |

Die API-Adresse wird über `import.meta.env.VITE_API_URL` verwendet.

Vite übernimmt diese Konfiguration beim Start des Entwicklungsservers beziehungsweise beim Produktionsbuild. Nach Änderungen an `.env.local` muss der Entwicklungsserver neu gestartet werden.

Für einen bereits erstellten Produktionsbuild lässt sich die API-Adresse nicht durch nachträgliches Setzen einer Container-Umgebungsvariable ändern. Dafür ist ein neuer Build erforderlich.

Variablen mit dem Präfix `VITE_` sind Teil des ausgelieferten Frontends. Dort dürfen keine geheimen API-Schlüssel, Zugangsdaten oder sonstigen Secrets hinterlegt werden.

## Backend-API

Die API-Anbindung befindet sich in `src/api.tsx`.

Das Frontend erwartet JSON-Antworten als Arrays, ohne zusätzliches Antwortobjekt wie `{ "data": ... }`.

### Verfügbare Nachrichtentage

```http
GET /dates
```

Beispielantwort:

```json
[
  "2026-11-25",
  "2026-11-24"
]
```

Die zurückgegebenen Datumswerte werden für die Navigation und den Abruf der zugehörigen Nachrichten verwendet. Ein einheitliches Format wie `YYYY-MM-DD` ist dafür geeignet.

### Nachrichten eines Tages

```http
GET /2026-11-25
```

Beispielantwort:

```json
[
  {
    "id": 1,
    "url": "[https://example.com/ki-nachricht](https://example.com/ki-nachricht)",
    "headline": "Beispiel einer KI-Nachricht",
    "summary": "Kurze Zusammenfassung der Nachricht.",
    "content": "Ausführlicher Inhalt der Nachricht."
  }
]
```

### Datenmodell einer Nachricht

| Feld | Typ | Bedeutung |
| --- | --- | --- |
| `id` | Positive Ganzzahl | Kennung der Nachricht |
| `url` | String | HTTP- oder HTTPS-URL der Originalquelle |
| `headline` | String | Überschrift |
| `summary` | String | Kurze Zusammenfassung |
| `content` | String | Ausführlicher Inhalt |

Die zugehörigen Typen, ArkType-Schemata und Validierungshelfer liegen unter `src/types/`.

### Erreichbarkeit und CORS

Die API-Anfragen erfolgen aus dem Browser, nicht aus dem nginx-Container.

Daher muss `VITE_API_URL` aus Sicht der Benutzer erreichbar sein. Ein ausschließlich innerhalb eines Docker-Netzwerks auflösbarer Dienstname reicht nicht aus.

Wenn Frontend und API unterschiedliche Origins verwenden, muss das Backend passende CORS-Header liefern. Bei einem über HTTPS ausgelieferten Frontend sollte auch die API über HTTPS erreichbar sein.

## Verfügbare Befehle

| Befehl | Beschreibung |
| --- | --- |
| `npm run dev` | Vite-Entwicklungsserver starten |
| `npm run build` | TypeScript-Build prüfen und Produktionsdateien erzeugen |
| `npm run preview` | Produktionsbuild lokal ansehen |
| `npm run lint` | Quellcode mit Oxlint prüfen |
| `npm run format:check` | Formatierung der TypeScript-Dateien unter `src/` prüfen |
| `npm run format` | TypeScript-Dateien unter `src/` mit Prettier formatieren |

Ein Skript für automatisierte Tests ist derzeit nicht in `package.json` definiert.

## Produktionsbuild

```bash
npm run build
```

Die fertigen Dateien werden im Verzeichnis `dist/` abgelegt.

Zum lokalen Prüfen des Builds:

```bash
npm run preview
```

## Docker

Das Dockerfile verwendet einen mehrstufigen Build:

1. npm-Abhängigkeiten installieren.
2. Produktionsabhängigkeiten mit `npm audit --omit=dev` prüfen.
3. Frontend mit Vite bauen.
4. Die erzeugten Dateien über nginx auf Port `80` ausliefern.

### Image bauen

`VITE_API_URL` ist ein verpflichtendes Build-Argument:

```bash
docker build \
  --build-arg VITE_API_URL=[https://api.example.com/ki-news](https://api.example.com/ki-news) \
  -t ki-news-frontend .
```

### Container starten

```bash
docker run -d \
  --name ki-news-frontend \
  --restart unless-stopped \
  -p 8080:80 \
  ki-news-frontend
```

Anschließend ist das Frontend unter folgender Adresse erreichbar:

```text
http://localhost:8080
```

### Deployment mit Coolify

Bei Verwendung des vorhandenen Dockerfiles:

1. Repository als Anwendung in Coolify einbinden.
2. Dockerfile als Build-Methode auswählen.
3. `VITE_API_URL` als Build-Variable beziehungsweise Build-Argument setzen.
4. Als internen Anwendungsport `80` konfigurieren.
5. Domain zuweisen und Deployment starten.

Ändert sich die API-Adresse, muss das Image neu gebaut werden.

## Projektstruktur

```text
.
├── public/                 Statische Assets
├── src/
│   ├── components/         Nachrichtenansicht, Navigation und Statusanzeigen
│   ├── types/              Datentypen, Schemata und Validierungshelfer
│   ├── util/               Hilfsfunktionen
│   ├── App.tsx             Aufbau der Anwendung
│   ├── api.tsx             RTK-Query-Endpunkte
│   ├── main.tsx            Einstiegspunkt
│   ├── slice.tsx           Navigationszustand und Aktionen
│   └── store.tsx           Redux-Store und typisierte Hooks
├── Dockerfile              Produktionsbuild und nginx-Auslieferung
├── package.json            Abhängigkeiten und npm-Skripte
├── package-lock.json       Fixierte Abhängigkeitsauflösung
└── vite.config.ts          Vite-Konfiguration
```

## Fehlerbehebung

### Es werden keine Nachrichten geladen

- Ist `VITE_API_URL` korrekt gesetzt?
- Wurde der Entwicklungsserver nach einer Änderung neu gestartet?
- Wurde bei einem Docker-Deployment das Image nach einer Änderung neu gebaut?
- Sind `/dates` und der jeweilige Datumsendpunkt erreichbar?
- Liefern beide Endpunkte JSON-Arrays im erwarteten Format?
- Zeigt die Browserkonsole CORS- oder Mixed-Content-Fehler?

### Der Container-Build bricht ab

Das Dockerfile bricht ab, wenn `VITE_API_URL` fehlt oder leer ist.

Außerdem wird während des Builds `npm audit --omit=dev` ausgeführt. Liefert dieser Schritt einen Fehlerstatus, wird der Build ebenfalls beendet. Die genaue Ursache steht im Build-Log.

## Lizenz

Die Lizenzbedingungen stehen in [LICENSE](./LICENSE).