let currentLink = "https://t.me/+5VcFpUB4KyQ2NzA1";

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    return res.status(200).json({ link: currentLink });
  }

  if (req.method === "POST") {
    const { password, link } = req.body;
    if (password !== "Link@69") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (typeof link === "string") {
      currentLink = link;
      return res.status(200).json({ success: true, link: currentLink });
    }
    return res.status(400).json({ error: "Invalid link" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
