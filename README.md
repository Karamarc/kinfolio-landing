# Kinfolio validation landing site

Static site for the 3-framing demand validation (week 1 of the monetization plan).

## Pages / variants
- `index.html` — neutral hub (variant `index`), links to the three framings
- `parents.html` — caregivers of aging parents (variant `parents`)
- `chronic.html` — chronic-illness / own-history trending (variant `chronic`)
- `global.html` — expats / cross-border / MENA bilingual records (variant `global`)

Ads and community posts should link DIRECTLY to a variant page with `?utm_source=...&utm_campaign=...`.

## Measurement (owned, no SDKs — FTC HBNR-safe)
`app.js` fires:
- `POST https://tonic.karamarc.com/api/public/beacon` `{variant, ref, src, cmp}` on pageview
- `POST https://tonic.karamarc.com/api/public/waitlist` `{email, variant}` on signup

Both endpoints live in the Tonic backend (rate-limited, no auth, CORS-allowed for the
landing origin). **Capture rate = waitlist / beacons per variant.** Decision rule from the
plan: best variant becomes THE positioning; all three <1% capture → stop and rethink.

## Deploy
GitHub Pages from `Karamarc/kinfolio-landing`; the `CNAME` file sets the served
domain. The landing lives at **www.kinfolio.health** — the apex `kinfolio.health`
belongs to the Tonic app, so `CNAME` must stay `www.kinfolio.health`. Setting it
back to the apex would take the app's domain away from Railway.

`kinfolio.health/demo` is printed on the clinic sell-sheets, so the app 301s that
one path to `https://www.kinfolio.health/demo`. Verify with
`curl -sI https://kinfolio.health/demo | head -3`.

Privacy/Terms are real pages in the app and are linked there on purpose.

## Compliance notes
Copy follows the FDA-wellness wording playbook (organizer/track/understand; no disease
claims, no "abnormal", no treatment guidance) and carries the 3-element disclaimer in the
footer. Do not add health-outcome claims to headlines when iterating on conversion.
