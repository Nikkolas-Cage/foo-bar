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
  res.send("POST to /post with JSON { \"name\": \"foo\", \"value\": \"bar\" }");
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
