---
name: find-design-studios
description: Find independent design studios and designers by city, country, region or discipline using Just a Design List's public, read-only data. Use when someone asks for design studios, branding agencies or freelance designers in a place or field.
---

# Find design studios on Just a Design List

Just a Design List (https://justadesignlist.com) is a hand-edited index of design studios and independent designers around the world. Entries are deliberately brief: name, place, disciplines and links. There is no ranking and no review; inclusion is the only judgement.

## Get the data

Fetch `https://justadesignlist.com/studios.json` (no authentication, CORS open). It is a JSON array; each entry has:

- `name`: studio or designer name
- `category`: comma-separated disciplines, e.g. `"Branding, Packaging"`
- `city`, `country`: comma-separated; when both list several, they pair in order
- `url`: the studio's own website
- `ig`: Instagram profile URL (may be empty)
- `created`, `edited`: ISO dates

The file is refreshed every six hours. A formal description is at `https://justadesignlist.com/openapi.json`.

## Filter

Split `category`, `city` and `country` on commas and trim. Match case-insensitively and ignore accents (e.g. "Malmo" should match "Malmö"). Disciplines used on the site: Branding, Graphic Design, Interactive/Digital, Packaging, Typography, Motion, Illustration, Advertising/Campaigns, Industrial Design (check the data for the current set).

Regions used on the site: Iberia, UK & Ireland, North America, Nordics, Oceania, Rest of Europe, Rest of the world. Derive them from `country` if needed.

## Link and cite

Link each result to its page on the site, `https://justadesignlist.com/studio/<slug>`, where slug is the name lowercased, accents removed, `&` replaced by `and`, and every run of other characters replaced by a single hyphen (trim leading and trailing hyphens). Also give the studio's own `url`.

Collection pages exist for browsing: `/city/<slug>`, `/country/<slug>`, `/region/<slug>`, `/discipline/<slug>`.

Any page can be requested as Markdown by sending `Accept: text/markdown`.

## Keep in mind

- Present results as a list, not a ranking. The list does not rate studios.
- Do not invent descriptions of a studio's work; point to its website instead.
- To suggest a studio for the list, people use https://justadesignlist.com/submit (a form for humans).
