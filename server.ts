import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const getLink = () => {
    try {
      const tmpPath = path.join("/tmp", "link.txt");
      if (fs.existsSync(tmpPath)) {
        return fs.readFileSync(tmpPath, "utf-8").trim();
      }
      const localPath = path.join(process.cwd(), "link.txt");
      if (fs.existsSync(localPath)) {
        return fs.readFileSync(localPath, "utf-8").trim();
      }
    } catch (err) {}
    return "https://t.me/+5VcFpUB4KyQ2NzA1";
  };
  
  const setLink = (newLink: string) => {
    try {
      const tmpPath = path.join("/tmp", "link.txt");
      import("fs").then(fs => fs.writeFileSync(tmpPath, newLink, "utf-8"));
    } catch (err) {}
    try {
      const localPath = path.join(process.cwd(), "link.txt");
      import("fs").then(fs => fs.writeFileSync(localPath, newLink, "utf-8"));
    } catch (err) {}
  };

  // API routes
  app.get("/api/link", (req, res) => {
    res.json({ link: getLink() });
  });

  app.post("/api/link", (req, res) => {
    const { password, link } = req.body;
    if (password !== "Link@69") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (typeof link === "string") {
      setLink(link);
      return res.json({ success: true, link: getLink() });
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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
