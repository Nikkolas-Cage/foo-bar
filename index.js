const express = require("express");

const app = express();
const PORT = process.env.PORT || 9005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function handleFooBar(req, res) {
  const body = req.body || {};
  console.log("Received post:", body);

  // n8n "Using Fields Below" with Name=Foo Value=Bar → { "Foo": "Bar" }
  const entries = Object.entries(body).map(([k, v]) => [
    String(k).toLowerCase(),
    String(v).toLowerCase(),
  ]);

  const foobared =
    entries.some(([k, v]) => k === "foo" && v === "bar") ||
    (String(body.name ?? "").toLowerCase() === "foo" &&
      String(body.value ?? "").toLowerCase() === "bar");

  if (foobared) {
    return res.send("you got foobared");
  }

  res.send("no you didnt fo barred me");
}

app.post("/", handleFooBar);
app.post("/post", handleFooBar);

app.get("/", (_req, res) => {
  res.type("html").send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>foo bar</title>
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: "Segoe UI", system-ui, sans-serif;
      background: linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      color: #e8f1f2;
      text-align: center;
      padding: 1.5rem;
    }
    h1 { font-size: clamp(1.8rem, 5vw, 3rem); margin: 0 0 0.75rem; }
    p { opacity: 0.85; max-width: 28rem; line-height: 1.5; }
    code { background: rgba(255,255,255,0.1); padding: 0.15em 0.4em; border-radius: 4px; }
  </style>
</head>
<body>
  <div>
    <h1>welcome to foo bar 👋</h1>
    <p>POST JSON like n8n: <code>{ "Foo": "Bar" }</code> to this page to get foobared.</p>
  </div>
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
