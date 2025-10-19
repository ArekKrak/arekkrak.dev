# Portfolio Website (Vol. 1)

![HTML5](https://img.shields.io/badge/HTML5-Markup-E34F26?logo=html5&logoColor=white&style=flat)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?logo=css3&logoColor=white&style=flat)
![JavaScript](https://img.shields.io/badge/JavaScript-Language-F7DF1E?logo=javascript&logoColor=black&style=flat)
![VS Code](https://img.shields.io/badge/VS_Code-Editor-007ACC?logo=visualstudiocode&logoColor=white&style=flat)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white&style=flat)](https://github.com/ArekKrak/go-ride)

This portfolio site was built as part of the Codecademy *Full-Stack Web Development* path (**Portfolio Website project**).  

**Course Brief (summary):**  
Create a static portfolio website with multiple pages, styled using HTML & CSS, and at least one interactive JavaScript feature. Deploy via GitHub Pages (optional custom domain).

## Overview

A responsive, accessible personal portfolio built as part of a full-stack web development path. It showcases projects, a short bio, and contact options, with a little flair (theme toggle, rotating SVG background, and a portrait crossfade effect).

   **Status:** v1 complete. Iterating as I add new projects.

---

## What's Inside

- **Home** — Name, role, social links, and an **interactive portrait:** a medieval-style image crossfades to a modern photo on hover/click.
- **About** — Short introduction and a list of technologies I use.
- **Projects** — Links to my highlighted work.
- **Contact** — Email, GitHub, and LinkedIn; icons/text share a unified **animated black-blue gradient** on hover.

I consider this Portfolio Website **Vol. 1** — it will evolve as my skills and projects grow.

---

## Interactive Features (JS)

- **Portrait crossfade** (hover/click toggle).
- **Theme toggle** (light/dark) with ```localStorage``` persistence.
- **Rotating, full-viewport SVG background** that respects ```prefers-reduced-motion```.

---

## Tech Stack

- **HTML5** - semantic structure.
- **CSS3** - responsive layout with Flexbox/Grid and custom gradients.
- **JavaScript** - DOM interactions, animation, theme state, accessibility niceties.
- **Fonts**: Google Fonts – [Lato](https://fonts.google.com/specimen/Lato)

---

## Accessibility

- Semantic landmarks and descriptive link text.
- Visible focusable controls (e.g., theme toggle button).
- **Reduced motion** respected (rotating background pauses for users with ```prefers-reduced-motion: reduce```).
- SVG icons use ```currentColor``` and are paired with accessible link text.

---

## Project Structure

```
arek-portfolio-website/
├── index.html                  # Home
├── about.html                  # Aboute
├── projects.html               # Projects
├── contact.html                # Contact
├── styles.css                  # Global styles
├── main.js                     # Interactivity (portrait, theme, background)
├── cypher-demo.html            # Demo page
├── mixed-messages-demo.html    # Demo page
├── styles-demo.css             # Demo styles
├── manifest.json               # Manifest
├── img/                        # Images and SVGs
│   ├── about-me.svg
│   ├── about-profile-pic.jpg
│   ├── back-arrow.svg
│   ├── background-dark.svg
│   └── ...etc
├── vid/                        # Project demo videos
│   ├── cypher.mp4
│   └── mixed-messages.mp4
└── README.md                   # Project documentation
```

---

## Live Site
**[View the Live Project](https://arekkrak.github.io/arek-portfolio-website/)**

---

## Key Concepts Demonstrated

- Responsive design with `@media` queries
- Flexbox & CSS Grid for layout.
- SVG with gradient fills synchronized with text gradients.
- Accessibility patterns (reduced motion, semantics).
- Local development workflow + Git/GitHub.
- Static hosting via GitHub Pages (custom domain ready).

---

## Future Improvements

This project serves as a front-end milestone and will be further expanded by:

 - Add more projects & remove older ones as I progress.
 - Improve image assets (replace medieval portrait with a professional one).
 - Expand JavaScript interactivity (project filters, animations with motion-safe fallbacks).
 - Add Lighthouse CI badge + automated checks.
 - Polish mobile nav micro-interactions.

---

## Acknowledgements

- Icons: [SVG Repo](https://www.svgrepo.com/)
- Backgrounds: [SVG backgrounds](https://www.svgbackgrounds.com/)
- Fonts: [Google Fonts](https://fonts.google.com/specimen/Lato)

---

## Contact
If you're a recruiter, mentor, or fellow developer interested in collaboration or feedback:

**Arek Krakowiak**  
[369arek12@protonmail.com](mailto:369arek12@protonmail.com)

---

Thank you for viewing this project!