import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import pool from "@/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const form = formidable({
    uploadDir: path.join(process.cwd(), "public", "uploads"),
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  });

  form.parse(req, (err, fields, files) => {
    (async () => {
      try {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        // Debug log
        console.log("Received files:", files);
        let file = files.file;
        if (Array.isArray(file)) file = file[0];
        if (!file) {
          res.status(400).json({ error: "No file uploaded" });
          return;
        }
        const userId = Array.isArray(fields.userId)
          ? fields.userId[0]
          : fields.userId;
        if (!userId) {
          res.status(400).json({ error: "Missing userId" });
          return;
        }
        const fileName = path.basename(file.filepath || file.path);
        const fileUrl = `/uploads/${fileName}`;
        // Get the old profile picture URL
        const oldResult = await pool.query(
          "SELECT profile_picture_url FROM users WHERE id = $1",
          [userId],
        );
        const oldUrl = oldResult.rows[0]?.profile_picture_url;
        // Update to new profile picture
        await pool.query(
          "UPDATE users SET profile_picture_url = $1 WHERE id = $2",
          [fileUrl, userId],
        );
        // Delete old file if it exists and is different from the new one
        if (oldUrl && oldUrl !== fileUrl) {
          const oldPath = path.join(
            process.cwd(),
            "public",
            oldUrl.replace(/^\/+/, ""),
          );
          fs.unlink(oldPath, (err) => {
            if (err)
              console.warn(
                "Failed to delete old profile picture:",
                oldPath,
                err.message,
              );
          });
        }
        res.status(200).json({ url: fileUrl });
      } catch (e) {
        res.status(500).json({ error: (e as Error).message });
      }
    })();
  });
}
