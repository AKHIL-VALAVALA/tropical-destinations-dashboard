# Tropical Destinations Dashboard

A React (Vite) dashboard built for the React Assessment 2 brief.

## Features
- Sticky responsive header with nav links + Explore CTA and mobile hamburger menu
- Featured destination hero section
- Destinations fetched dynamically from the provided API, rendered as cards (image, name, location, rating, tag)
- Live search by destination name (shows "No such destination" when nothing matches)
- Client-side pagination (6 cards per page)
- Student discount / promotions section with booking CTA
- Booking form (Name, Email, Date, Destination) with mock submission
- Fully responsive layout (CSS Grid/Flexbox) for mobile and desktop

## Tech
- React 18 functional components + hooks (useState, useEffect, useMemo)
- Fetch API for data loading
- Plain CSS (custom properties, Grid/Flexbox)

## Getting Started

\`\`\`bash
npm install
npm run dev      # start local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build
\`\`\`

## API
Destination data is fetched from the API URL provided in the assessment brief.
The fetch logic in DestinationsSection.jsx normalizes the response shape
(array vs { destinations: [...] } vs { data: [...] }, and a few common
field-name variants) so the UI stays resilient to minor API differences.

## Deployment
Build the app (npm run build) and deploy the dist/ folder to Vercel,
Netlify, or GitHub Pages, then add the live URL plus this repo link to
your submission.
