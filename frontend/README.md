# Xandeum pNode Analytics Dashboard

**Author:** Saber. (Xandeum Labs Hackathon Submission)

---

## About Xandeum Labs

Xandeum is building a scalable storage layer for Solana dApps, powered by a network of storage provider nodes called pNodes.

## Mission

Develop an analytics platform for Xandeum pNodes, similar to Solana validator dashboards (stakewiz.com, topvalidators.app, validators.app).

## Scope

- Web-based analytics platform for Xandeum pNodes
- Retrieves live pNode stats using public pRPC endpoints (see `lib/pnodePublicIps.ts`)
- Displays node info: IP, CPU %, RAM, uptime, online status, storage (if available)
- Modern, responsive, animated UI (Next.js 14, React, Tailwind, Framer Motion)

## How It Works

- For each public node IP, the dashboard POSTs to `http://<ip>:6000/rpc` with `{ "jsonrpc": "2.0", "method": "get-stats", "id": 1 }`
- The API route `/api/pnodes` aggregates all node stats and returns them to the frontend
- The UI updates in real time with live node metrics

## Features

- Table view: IP, CPU %, RAM, uptime, online/error status
- Storage chart (using file_size as proxy for used storage)
- Animated, responsive landing page and dashboard
- Error handling for offline nodes

## How to Run Locally

1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Submission Requirements

- This repo contains a fully functional, documented platform
- All code is accessible and ready for review
- See above for deployment instructions

## Judging Criteria

- **Functionality:** Successfully retrieves and displays pNode info using valid pRPC calls
- **Clarity:** Information is easy to understand
- **User Experience:** Intuitive, user-friendly, and visually appealing
- **Innovation (Optional):** Extra features or unique data presentation

## Credits

- Built by Saber. for Xandeum Labs Hackathon, 2025
- Uses live public pRPC endpoints provided by the Xandeum team
- For questions or demo, contact Saber. or join the Xandeum Discord: https://discord.gg/uqRSmmM5m

---

Ready for submission! 🚀
