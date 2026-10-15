# Weekly blog article — instructions

One French article a week for https://voyagees.com/fr/blog. It is proposed
as a pull request; the founder reviews it and merges, which publishes it.
Everything in `marketing/BRIEF.md` applies (voice "on", never-say list,
drive times, seasons).

## 1. Pick the topic

- List existing articles: `git show origin/main:content/blog/fr/` (and read
  any that are close to your idea). Never write a second article on a
  topic already covered; never pick a slug that already exists.
- Also check open pull requests (GitHub tools) so you don't duplicate an
  article still waiting for review.
- Choose what French travellers actually search for, in season (see the
  brief's calendar). Ideas, roughly in priority order — skip any done:
  - Quand partir au Sri Lanka ? (saisons par région, mois par mois)
  - Combien de jours au Sri Lanka ? (7, 10, 14, 21 jours)
  - Chauffeur privé au Sri Lanka : comment ça marche
  - Itinéraire Sri Lanka 2 semaines
  - Itinéraire Sri Lanka 7 jours
  - Sri Lanka en famille : conseils et itinéraire
  - De l'aéroport de Colombo à Kandy / Sigiriya / Galle : temps et options
  - Sigiriya : conseils de visite (et Pidurangala)
  - Kandy en 1 ou 2 jours
  - Ella : que faire, combien de temps rester
  - Safari au Sri Lanka : Yala, Udawalawe, Minneriya — lequel choisir
  - La côte sud : Mirissa, Galle, Unawatuna, Tangalle
  - La côte est en été : Trincomalee, Arugam Bay, Passikudah
  - Le Triangle culturel en 3 jours
  - Les plantations de thé : Nuwara Eliya, Haputale
  - Budget : ce qui coûte et ce qui ne coûte pas (no numbers — see below)
  - Que manger au Sri Lanka
  - Premier voyage au Sri Lanka : 10 conseils pratiques

## 2. Write it

File: `content/blog/fr/<slug>.md`, slug in lowercase French words with
hyphens, no accents (e.g. `quand-partir-au-sri-lanka`). Format:

```
---
title: Full article title (can be long, shown on the page)
metaTitle: Shorter title for Google, under 50 characters
description: 140–160 characters, what the reader gets. Shown in Google.
date: YYYY-MM-DD   (today's date)
image: /images/hero/<name>.webp
imageAlt: Short French description of the photo
---

Intro paragraph…

## Section heading
```

- Images available (use `/images/hero/<name>.webp`): anuradhapura,
  arugambay, colombo, ella, galle, haputale, jaffna, kalpitiya, kandy,
  minneriya, negombo, nuwaraeliya, passikuda, polonnaruwa, sigiriya,
  trincomalee, udawalawe, wilpattu, yala. A Facebook-friendly JPEG copy is
  picked automatically — don't add one.
- Markdown allowed (nothing else renders): `## Heading`, `### Subheading`,
  paragraphs, `- bullets`, `1. numbered`, `> tip box` lines, `**bold**`,
  `*italic*`, `[text](/fr/...)` links. No images in the body, no tables, no
  HTML.
- 1,000–1,600 words. Short paragraphs. Concrete, practical, honest. Start
  with the answer, then the details. One `> ` tip box is plenty.
- Internal links (3–6, natural): destination pages
  `/fr/destinations/<slug>` (slugs: colombo, negombo, kandy, sigiriya,
  dambulla, polonnaruwa, anuradhapura, minneriya, ella, nuwara-eliya,
  haputale, horton-plains, adams-peak, galle, mirissa, bentota,
  hikkaduwa, yala, udawalawe, wilpattu, trincomalee, passikudah,
  arugambay, jaffna, kalpitiya, kitulgala, pinnawala), and
  `/fr/plan-trip`, `/fr/search`, `/fr/airport-transfer`,
  `/fr/private-driver`, `/fr/blog/<other-article>`.
- End with a soft paragraph pointing to the free trip planner
  (`/fr/plan-trip`) — the page adds its own call-to-action box below, so
  don't add another.
- Drive times only from the brief (or clearly "environ"). No prices of any
  kind, no visa/health/safety rules stated as fact, no invented stories,
  reviews or statistics, no "meilleur/n°1". Train: see the brief.

## 3. Propose it

```
git fetch origin main
git checkout -b claude/blog-YYYY-MM-DD origin/main
# add content/blog/fr/<slug>.md — and nothing else
git add content/blog/fr/<slug>.md
git commit -m "Blog: <title>"
git push -u origin claude/blog-YYYY-MM-DD
```

Then open a pull request into `main` titled `Blog: <title>`, with a short
English description for the founder: the topic and why now, the target
search phrase, and anything to double-check. Do not merge it.

If the push or pull request fails, say so clearly in the final summary.
