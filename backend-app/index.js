const express = require("express");
const cors = require("cors");
const users = require("./routes/users");
const books = require("./routes/books");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/books", books);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App is listining on port ${port}`));
