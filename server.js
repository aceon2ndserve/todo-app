// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const sqlite3 = require("sqlite3").verbose();

// const app = express();
// const port = process.env.PORT;
// const API_URL = "https://todo-app-4dqx.onrender.com";

// const db = new sqlite3.Database("database.db");

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static("."));
// db.serialize(() => {
//   db.run(`CREATE TABLE IF NOT EXISTS todos (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     text TEXT NOT NULL,
//     completed BOOLEAN NOT NULL DEFAULT 0
//   )`);
// });

// app.get("/todos", (req, res) => {
//   db.all("SELECT * FROM todos", [], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.json(rows);
//   });
// });

// app.post("/todos", (req, res) => {
//   const { text } = req.body;
//   db.run(
//     "INSERT INTO todos (text, completed) VALUES (?, ?)",
//     [text, false],
//     function (err) {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({ id: this.lastID, text, completed: false });
//     }
//   );
// });

// app.delete("/todos/:id", (req, res) => {
//   const { id } = req.params;
//   db.run("DELETE FROM todos WHERE id = ?", id, (err) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }
//     res.status(204).send();
//   });
// });

// app.put("/todos/:id", (req, res) => {
//   const { id } = req.params;
//   const { completed } = req.body;
//   db.run(
//     "UPDATE todos SET completed = ? WHERE id = ?",
//     [completed, id],
//     function (err) {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       res.json({ id, completed });
//     }
//   );
// });

// app.listen(port, () => {
//   console.log(`Server running`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 3000;
const API_URL = "https://todo-app-4dqx.onrender.com" || "http://localhost:3000";

const db = new sqlite3.Database("database.db");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from the 'public' folder

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
  )`);
});

app.get("/todos", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.post("/todos", (req, res) => {
  const { text } = req.body;
  db.run(
    "INSERT INTO todos (text, completed) VALUES (?, ?)",
    [text, false],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, text, completed: false });
    }
  );
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", id, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.run(
    "UPDATE todos SET completed = ? WHERE id = ?",
    [completed, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id, completed });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running at ${API_URL}`);
});
