# Placeholders

Every temporary image or 3D asset used for design only. Each image carries `data-placeholder="true"` (find with a DOM search). Replace with real clinic photos taken with patient consent.

| File                                                               | Used in                                                                           | Source                                                            | Licence          | Replace with                            |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------- | --------------------------------------- |
| `public/images/placeholder/portrait.svg`                           | Home, Doctor page                                                                 | Drawn for this project                                            | Project-owned    | Photo of Dr. Nileema Chaudhary          |
| `public/images/placeholder/tech-2..6.jpg`                          | Technology tabs 2 to 6 (Home, About), in the order of `src/content/technology.ts` | Unsplash (generic therapy-device photos, not the actual machines) | Unsplash licence | Real photo of each machine              |
| `public/images/placeholder/{leg,back,exercise,shoulder,spine}.jpg` | Home: care cards and "How it works" stack                                         | Unsplash (physiotherapy search)                                   | Unsplash licence | Real clinic photos with patient consent |

Unsplash photo IDs: shoulder `1645005512968-0c1fe99f0093`, leg `1649751361457-01d3a696c7e6`, back `1706353399656-210cca727a33`, spine `1540205895360-4ad4cffb3aa8`, exercise `1645005513713-9e2b92a687d3`.

tech-2 `1754941622138-b3c3671f2fa8`, tech-3 `1754941622136-6664a3f50b2e`, tech-4 `1598300195998-364bf445842c`, tech-5 `1754941622117-97957c5d669b`, tech-6 `1709880754472-be89c13abc52`.

Real clinic photos (not placeholders): `public/images/clinic/reception.jpg` and `treatment-room.jpg` (RoboSpine table, also used for the first technology tab), taken from the clinic's Google Maps listing. Confirm the owner holds the rights to both.

## 3D model

The hero spine is procedural (`src/three/SpineScene.tsx`), so there is no external model or credit line. To use a CC-BY Sketchfab model instead, record its URL, author and licence here and add the credit to the footer.
