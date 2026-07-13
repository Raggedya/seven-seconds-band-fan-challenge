# Immigrant Union Fan Challenge

A mobile-first, premium promotional quiz for bands and musicians. This launch edition draws each 10-question game from a **50-question Immigrant Union bank**, uses a fast timed format, moves automatically through the challenge, then presents a score, fan classification and music-discovery links.

## Play locally

The game loads JSON files, so open it through a small local web server rather than double-clicking `index.html`.

1. Open PowerShell in this folder.
2. Run `python -m http.server 8000`.
3. Visit `http://localhost:8000` in a browser.

No installation or build step is required.

## How the game works

1. The opening screen explains the 10-question challenge.
2. Selecting **Start the Challenge** unlocks mobile audio and immediately opens Question 1.
3. Each question displays four answers and an accurate timestamp-based seven-second timer.
4. The first answer tap locks all options. A correct answer plays the existing ding; incorrect answers and timeouts remain silent.
5. The answer and explanation remain visible for four seconds, then the next question appears and its countdown starts immediately.
6. A timeout is recorded as unanswered and incorrect.
7. After Question 10, the player sees their score, classification, statistics, discovery links, replay and sharing controls.

There is deliberately **no GO sound** and no Next Question button.

## Reuse this for another band

Most new editions require changes in only four places:

1. `config/band.json` — band name, edition text, timer, colours, classifications and external links.
2. `data/questions.json` — the question library.
3. `assets/immigrant-union-original-background.png` — replace with the next edition’s original or properly licensed background and update the path in the configuration.
4. The edition-specific title in the page description if desired.

The core game logic in `js/engine.js` and `js/app.js` should not need rewriting.

## Band configuration

Edit `config/band.json` to change:

- `bandName`, `editionTitle` and `quizTitle`
- `numberOfQuestions` and `secondsPerQuestion`
- Spotify, Bandcamp, YouTube and Instagram URLs
- optional website, tickets, merchandise and mailing-list URLs
- accent colours
- score classifications and encouraging result messages

Blank optional URLs are hidden automatically. Never publish guessed links.

## Questions

Questions live in `data/questions.json`. Each active item needs:

- a unique ID and question
- exactly four unique options
- one `correctAnswer` that exactly matches an option
- difficulty: `easy`, `medium` or `hard`
- category, short explanation and source note
- `active: true`

The launch validator expects exactly 50 active questions: 20 easy, 20 medium and 10 hard. Every game draws four easy, four medium and two hard questions. Selecting **Take the Quiz Again** produces a fresh set, with no repeats until all 50 questions have appeared across five games. The bank then reshuffles for a new cycle. Answer order is also shuffled on every game.

## Branding and artwork

- `assets/seven-seconds-aggits-master.png` is the approved original Aggits artwork. **Do not redraw, regenerate or replace Aggits.**
- The interface repositions regions of that exact master image responsively; it does not create a new character.
- The opening screen shows the band name once beside a single, intact Aggits character. Quiz and result screens use the compact text-only band lock-up.
- `assets/immigrant-union-original-background.png` is new, original psychedelic-country artwork created for this repository. It is album-inspired but does not copy copyrighted Immigrant Union cover art.
- Immigrant Union’s published Bandcamp album artwork is marked all rights reserved, so no album cover was copied into this repository.

## Sound

`assets/ding.mp3` is the established correct-answer bell. It is preloaded and unlocked by the initial Start tap for mobile browsers. It plays only for a correct answer and does not delay progression. The sound preference is remembered in LocalStorage where available. If playback is blocked, the game continues normally.

The GO file is intentionally absent and no GO playback code exists.

## Testing

With Node.js installed, run:

```powershell
node scripts/validate-questions.mjs
node scripts/test-engine.mjs
node --check js/app.js
```

Before publishing, test the full challenge at 320, 375, 390, 430 and 768 pixels wide, plus desktop. Confirm all answers fit, the timer remains prominent, Aggits appears once and intact, replay and sharing work, and the console has no errors.

## GitHub Pages deployment

1. Create or push this folder to its own GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`, then save.
5. GitHub will publish the site at `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

All asset and data paths are relative so they work from a GitHub Pages repository subdirectory.

## Accessibility and resilience

The interface uses semantic buttons and headings, visible focus states, screen-reader announcements, text indicators in addition to colour, reduced-motion support and touch targets near or above 44 pixels. Missing optional links are hidden. Missing content displays a plain-language error rather than breaking the page.
