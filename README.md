# www.kinfolio.health — redirect only

This repository no longer holds the marketing site. It serves **one job**:
forward `www.kinfolio.health` to the real site.

## Where the landing lives now

`Medical-Journal` → `tonic-ui/public/landing/`, served by the app at
**https://kinfolio.health/landing/**, with **https://kinfolio.health/demo**
kept as a short alias because that URL is printed on the clinic sell-sheets.

Edit the landing there and deploy the app; there is no separate deploy.

## Why it moved

The app took the `kinfolio.health` apex. That left two near-identical
hostnames serving two different sites — `www.kinfolio.health` (campaign) and
`kinfolio.health` (product) — which visitors could not tell apart. One origin
removes the ambiguity, and the landing gets HTTPS, the same deploy pipeline
and the same uptime as the app.

## How the redirect works

GitHub Pages cannot issue a 301, so `redirect.js` does it client-side.
`404.html` loads the same script, and Pages serves `404.html` for every path
that no longer exists here — which is what makes the redirect path-preserving:
`/labs.html` still lands on `/landing/labs.html`.

`CNAME` must stay `www.kinfolio.health`. Pointing it back at the apex would
take the domain away from Railway and break the app.

## Verifying

    python -m app.scripts.domain_invariants    # from Medical-Journal/backend

checks this redirect along with every other live domain invariant.
