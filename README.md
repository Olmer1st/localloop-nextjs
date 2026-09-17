# LocalLoop

LocalLoop is a demo consumer app for discovering nearby events and planning
your weekend. Browse a feed of local happenings, filter by category, price,
day, or distance, and save the ones you don't want to miss.

## Features

- Discover feed with a featured event, category chips, and a responsive event grid
- Search by event title or venue
- Filtering by day, max price, and max distance (desktop popover / mobile bottom sheet)
- Sort by soonest, nearest, or price
- Event detail view with date, venue, description, and price
- Favoriting with a live count in the header
- Responsive layout from mobile through desktop, with visible keyboard focus states

All data is local, deterministic mock data — there is no backend, database,
or external API.

## Prerequisites

- Node.js 20+
- npm

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Build

```bash
npm run build
```

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- React + TypeScript
- Tailwind CSS
