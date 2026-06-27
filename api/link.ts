import fs from 'fs';
import path from 'path';

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
  return "https://t.me/+gsPXxiemhcI2ODk1";
};

const setLink = (newLink: string) => {
  try {
    const tmpPath = path.join("/tmp", "link.txt");
    fs.writeFileSync(tmpPath, newLink, "utf-8");
  } catch (err) {}
  try {
    const localPath = path.join(process.cwd(), "link.txt");
    fs.writeFileSync(localPath, newLink, "utf-8");
  } catch (err) {}
};

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    return res.status(200).json({ link: getLink() });
  }

  if (req.method === "POST") {
    const { password, link } = req.body;
    if (password !== "Link@69") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (typeof link === "string") {
      setLink(link);
      return res.status(200).json({ success: true, link: getLink() });
    }
    return res.status(400).json({ error: "Invalid link" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
