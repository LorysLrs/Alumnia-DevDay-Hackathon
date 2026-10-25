# Sector-first demo test battery

## Purpose

Verify that the student’s stated direction and AI conversation establish the starting sector; interests and RIASEC refine possible roles without replacing the student’s idea. The Hub must show useful next steps in that sector and keep application submission on external sites.

## Automated checks

- `npm run test:sector` checks sector inference, precedence, role ranking and the rendered Hub contract.
- `npm test` runs questionnaire scoring and fallback-profile business checks, then the sector-first suite.
- `npm run typecheck` checks the TypeScript questionnaire and profile code.
- `npm run test:db` checks the migration, RLS and partner aggregate behavior.

## Browser business scenarios

Run against `http://127.0.0.1:3000/alumnia-demo.html` with a clean browser profile, then repeat at 390 px viewport width. Use the Demo control to seed each persona and open the Hub.

| ID | Student direction / action | Expected result |
|---|---|---|
| SF-01 | Save “cybersecurity” as the explicit career direction | Cybersecurity & digital safety leads the Hub. CTFs, cybersecurity hackathons, security events and cyber/network/support role options appear. |
| SF-02 | Camille: “data science, maybe finance” | Data & finance leads; Data Analyst and finance/business roles remain available, rather than the idea being flattened to a generic job. |
| SF-03 | Sami: “app design” | Digital product & design leads; UX/UI, game and motion design are possible roles. |
| SF-04 | Paul: “something practical, perhaps IT” | Broad digital technology remains the starting space and the Hub presents several role paths without claiming certainty. |
| SF-05 | Open a sector role | The role detail names the sector as context. “My route through the sector” still opens the full study pathway. |
| SF-06 | Visit the Hub feed | Events, internships and study pathways, professionals, companies, sector news, project ideas, CV and LinkedIn resources are visible. Application submission is described as taking place on an employer or school website. |
| SF-07 | Use the AI conversation | The assistant refers to the student’s words; new detail changes or adds context to the profile, not a final decision. RIASEC does not overrule the stated direction. |
| SF-08 | Resize to 390 px | Hub and role options fit the viewport without horizontal overflow; controls remain reachable. |
| SF-09 | Review the film | 16:9, exactly two minutes; opening uses credited Paris footage; street audio fades after 3 seconds; the 10–27 second passage is labeled synthetic draft until a real student voice replaces it; consistent Alumnia colors/type, readable captions, purposeful motion. |

## Latest run

Run date: 25 October 2026.

- `npm test` — passed: RIASEC scoring, stated-sector fallback priority and 14 sector-first rules.
- `npm run typecheck` — passed (`tsc --noEmit`).
- `npm run test:db` — passed: migration, row-level security and partner aggregate checks.
- Playwright on the local demo — Yanis (with explicit cybersecurity direction), Camille, Sami and Paul showed the expected starting sectors and role families. Selecting a role opened its detail with the sector still visible. No page errors.
- Playwright Hub business scenario — cybersecurity CTFs, study pathways, professionals, companies, CV/LinkedIn guidance, external application hand-off and role detail all present; no page errors.
- Playwright at 390 px — document width 390 px, Hub focus card width 358 px; no horizontal overflow.
- Video media smoke — three selected sources load; narration duration 16.49 s; H.264 MP4 supported; no browser errors.
- Final film — 1920×1080, 120.018 s; audio and video decode successfully. The voice is a clearly labeled synthetic draft, not a real testimony.

Before a public screening: replace the synthetic draft with a recorded participant’s own testimony and confirm the spelling of the `@slim..093` credit against the original post.
