import { Router } from "express";

const router = Router();

router.post("/chat", async (req, res) => {
  try {
    const response = await fetch("http://127.0.0.1:19161/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Flask proxy error:", error);

    res.status(500).json({
      error: "Could not connect to Flask server",
    });
  }
});

export default router;