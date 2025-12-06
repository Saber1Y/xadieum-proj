const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  // simple JSON-RPC handler for pn_getGossipNodes
  const { method } = req.body || {};
  if (method !== "pn_getGossipNodes") {
    return res.json({
      jsonrpc: "2.0",
      id: 1,
      error: { code: -32601, message: "Method not found" },
    });
  }

  const now = Math.floor(Date.now() / 1000);
  const sample = [];
  for (let i = 0; i < 20; i++) {
    sample.push({
      nodeId: `Pn${(Math.random() + 1).toString(36).substring(2, 9)}`,
      ip: `${Math.floor(Math.random() * 255)}.${Math.floor(
        Math.random() * 255
      )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      gossip: {
        lastSeen: now - Math.floor(Math.random() * 3600 * 24 * 7),
        softwareVersion: `v0.${Math.floor(Math.random() * 10)}.${Math.floor(
          Math.random() * 10
        )}`,
        storage: {
          used: Math.floor(Math.random() * 500_000_000),
          capacity: 500_000_000,
        },
      },
    });
  }

  res.json({ jsonrpc: "2.0", id: 1, result: sample });
});

app.listen(port, () =>
  console.log(`Mock pRPC server listening on http://localhost:${port}`)
);
