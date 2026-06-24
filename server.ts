import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory storage for the link
  let currentLink = "https://t.me/+5VcFpUB4KyQ2NzA1";

  // API routes
  app.get("/api/link", (req, res) => {
    res.json({ link: currentLink });
  });

  app.post("/api/link", (req, res) => {
    const { password, link } = req.body;
    if (password !== "Link@69") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (typeof link === "string") {
      currentLink = link;
      return res.json({ success: true, link: currentLink });
    }
    return res.status(400).json({ error: "Invalid link" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
