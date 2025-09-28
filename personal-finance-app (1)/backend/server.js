const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.sqlite");
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS finance (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, category TEXT, amount REAL, note TEXT)");
});

app.get("/finance", (req, res) => {
  db.all("SELECT * FROM finance", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/finance", (req, res) => {
  const { type, category, amount, note } = req.body;
  db.run(
    "INSERT INTO finance (type, category, amount, note) VALUES (?,?,?,?)",
    [type, category, amount, note],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, type, category, amount, note });
    }
  );
});

app.put("/finance/:id", (req, res) => {
  const { id } = req.params;
  const { type, category, amount, note } = req.body;
  db.run(
    "UPDATE finance SET type=?, category=?, amount=?, note=? WHERE id=?",
    [type, category, amount, note, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

app.delete("/finance/:id", (req, res) => {
  db.run("DELETE FROM finance WHERE id=?", req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
