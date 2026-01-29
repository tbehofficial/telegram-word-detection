import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    const text = (req.query.text || "").toLowerCase();

    if (!text) {
      return res.status(400).json({
        success: false,
        error: "No text provided"
      });
    }

    const filePath = path.join(process.cwd(), "data", "hacking.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(rawData);

    const keywords = json.keywords || [];
    const matched = keywords.filter(w => text.includes(w));

    return res.status(200).json({
      success: true,
      total_matches: matched.length,
      matched_words: matched
    });

  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message
    });
  }
}
