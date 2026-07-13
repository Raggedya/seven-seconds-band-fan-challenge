# Immigrant Union Deep Cuts Fan Challenge

A premium, mobile-first fan quiz built around twelve researched Immigrant Union stories. Each game uses the complete 12-question library, a fifteen-second countdown, concise answer explanations, source links, fan rankings and official music-discovery links.

## Play locally

The game loads JSON files, so open it through a small local web server rather than double-clicking `index.html`.

1. Open PowerShell in this folder.
2. Run `python -m http.server 8000`.
3. Visit `http://localhost:8000` in a browser.

No installation or build step is required.

## How Deep Cuts works

1. Selecting **Start the Challenge** unlocks mobile audio and immediately opens Question 1.
2. Each question presents four choices and an accurate timestamp-based fifteen-second timer.
3. Seconds 15–4 are silent. A clean 120 ms beep plays once at 3, 2 and 1. The existing ding plays only if the timer reaches zero.
4. An early answer stops the timer and all pending sounds immediately; it never plays the ding.
5. The correct answer, **Deep Cut** badge, 15–40-word explanation and linked source remain visible for ten seconds.
6. The next question then starts automatically. After Question 12, the player sees their score, ranking, statistics, discovery links, replay and sharing controls.

## Question specification

Questions live in `data/questions.json`. Each active item contains:

- unique `id`
- `category` and `difficulty`
- question and exactly four unique options
- one `correctAnswer` that exactly matches an option
- a 15–40-word `explanation`
- `sourceName` and HTTPS `sourceURL`
- `active: true`

The validator enforces exactly twelve questions: 3 easy, 6 medium and 3 hard. It also enforces 3 Album Deep Cuts, 3 Song / Recording Deep Cuts, 2 Band Member, 2 Touring / Live and 2 Behind the Scenes questions. Answer order and question order are shuffled on every play.

## Rankings

- 0–3: Curious Listener
- 4–6: Proper Fan
- 7–9: Deep Cut Disciple
- 10–11: Band Historian
- 12: How Did You Know That?!

## Reuse this for another band

Most new editions require changes in four places:

1. `config/band.json` — band name, edition text, colours, rankings, audio and official links.
2. `data/questions.json` — the researched question library and source references.
3. Edition artwork referenced by the configuration.
4. The page title and description in `index.html`.

The reusable engine in `js/engine.js` should not require rewriting. Blank optional platform URLs are hidden automatically; never publish guessed links.

## Branding and artwork

- `assets/seven-seconds-aggits-master.png` is the approved original Aggits artwork. **Do not redraw, regenerate or replace Aggits.**
- `assets/aggits-original-cutout-v4.png` uses the exact original Aggits colour pixels with only the surrounding background made transparent.
- The opening screen shows the band name once and a single centred Aggits against the approved calm, premium blue-to-black vignette.
- The cover contains no green background, no duplicate character and no scenery behind Aggits.
- `assets/immigrant-union-original-background.png` is original edition artwork used only as a restrained supporting texture outside the front cover.

## Sound

- `assets/beep.wav` is a 120 ms, 1320 Hz mono countdown cue.
- `assets/ding.mp3` is the established timeout bell and has not been replaced.
- Both sounds are preloaded and unlocked from the initial Start tap for mobile browsers.
- Playing either cue stops and resets the other, preventing overlap.
- The sound preference is remembered in LocalStorage where available.
- Hiding the browser tab safely stops audio and resets the current question timer before play resumes.

## Testing

With Node.js installed, run:

```powershell
node scripts/validate-questions.mjs
node scripts/test-engine.mjs
node --check js/app.js
```

Before publishing, test the challenge at 320, 375, 390, 430 and 768 pixels wide, plus desktop. Confirm all four answers fit, the timer remains clear, Aggits appears once and intact, the 3–2–1 beep sequence and zero ding are correct, early answers are silent, replay and sharing work, source links open safely, and the console has no errors.

## GitHub Pages deployment

1. Push the review branch and open a pull request into `main`.
2. Merge only after approval.
3. In **Settings → Pages**, select deployment from `main` and `/ (root)` if Pages is not already configured.

All asset and data paths are relative so they work from a GitHub Pages repository subdirectory.

## Accessibility and resilience

The interface uses semantic controls, visible focus states, screen-reader announcements, text indicators in addition to colour, reduced-motion support and touch-friendly targets. Missing optional links are hidden. Missing or invalid content displays a plain-language error rather than breaking the page.
