const express = require("express");

const app = express();
const PORT = process.env.PORT || 9005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/post", (req, res) => {
  const { name, value } = req.body;

  console.log("Received post:", { name, value });

  if (name === "foo" && value === "bar") {
    return res.json(true);
  }

  res.send("no you didnt fo barred me");
});

app.get("/", (_req, res) => {
  res.type("html").send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>foo bar</title>
  <style>
    :root { color-scheme: light; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: "Segoe UI", system-ui, sans-serif;
      background: linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      color: #e8f1f2;
    }
    h1 {
      font-size: clamp(2rem, 6vw, 3.5rem);
      font-weight: 700;
      letter-spacing: 0.02em;
      text-align: center;
    }
  </style>
</head>
<body>
  <h1>you got foo bared 😈</h1>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
