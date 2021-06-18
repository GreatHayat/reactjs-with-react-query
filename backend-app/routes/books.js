const express = require("express");
const models = require("../models");

const router = express.Router();
const { Book, User } = models;

router.get("/", async (req, res) => {
  const books = await Book.findAll({
    include: [
      {
        model: User,
        as: "userObj",
        attributes: {
          exclude: ["createdAt", "updatedAt", "email", "password"],
        },
      },
    ],
  });
  res.status(200).send(books);
});

router.get("/:id", async (req, res) => {
  const book = await Book.findByPk(req.params.id, {
    attributes: { exclude: ["createdAt", "updatedAt", "id"] },
    include: [
      {
        model: User,
        as: "userObj",
        attributes: { exclude: ["createdAt", "updatedAt", "id"] },
      },
    ],
  });
  res.status(200).send(book);
});

router.post("/", async (req, res) => {
  const book = await Book.create({
    title: req.body.title,
    pages: req.body.pages,
    userId: req.body.userId,
  });

  res.status(201).send({ message: "Book Created Successfully!", book });
});

router.delete("/:id", async (req, res) => {
  await Book.destroy({
    where: { id: req.params.id },
  });
  res.status(200).send({ message: "Book Deleted Successfully!" });
});

module.exports = router;
