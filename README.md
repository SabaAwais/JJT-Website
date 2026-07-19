## JJT Website

A redesigned frontend for Junior Jinnah Trust, a nonprofit providing education and community support to underprivileged children in Pakistan. This project was built as part of my summer internship with JJT, where our team was tasked with upgrading their existing website and fixing gaps in their donation experience.

## What it does

- Displays JJT's mission, impact stats, and current campaigns on the homepage
- Includes a dedicated About page covering JJT's founding, campuses, and the number of students they support
- Lists JJT's core values and guiding principles
- Shows live progress bars on each campaign so donors can see how much has been raised toward a goal
- Provides a full multi step donation flow, letting a donor pick a campaign, choose a monthly or yearly amount, select a donor type, and pay through card, JazzCash or Easypaisa, or bank transfer

## Tech Stack

- React
- Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

## Why I built this

JJT's original site had no real online payment flow, donors had to manually transfer money and then message the organization for a receipt, and there was no way to see progress toward a campaign's goal. This project was our attempt at solving those specific gaps while keeping the design simple and true to what a small nonprofit team could realistically maintain. It also ties directly into the CRM system we're separately building for JJT since the donor information collected through this flow is meant to eventually feed into that donor tracking system.
