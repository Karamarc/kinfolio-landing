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
Any static host. Simplest: Railway static service or GitHub Pages.
When kinfolio.health is purchased, attach it and update ad links.
TODO when domain live: move Privacy/Terms links from tonic.karamarc.com to the kinfolio domain.

## Compliance notes
Copy follows the FDA-wellness wording playbook (organizer/track/understand; no disease
claims, no "abnormal", no treatment guidance) and carries the 3-element disclaimer in the
footer. Do not add health-outcome claims to headlines when iterating on conversion.
