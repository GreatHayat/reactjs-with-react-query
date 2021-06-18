const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const express = require("express");

const models = require("../models");
const router = express.Router();

const { User } = models;

router.get("/", async (req, res) => {
  const users = await User.findAll({ attributes: ["id", "username", "email"] });

  res.status(200).send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return res.status(404).send({ message: "User not found with given ID" });
  }
  res.status(200).send(user);
});

router.post("/", async (req, res) => {
  let user = await User.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
    },
  });
  if (user) {
    return res
      .status(400)
      .send({ message: "User already exist with given email/username" });
  }
  user = await User.build({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  //   user = await User.create({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });

  res.status(200).send({ user });
});

router.put("/:id", async (req, res) => {
  let user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(404).send({ message: "User not found with given ID" });
  }

  try {
    user = await User.update(
      {
        username: req.body.username,
        email: req.body.email,
        //   password: req.body.password, // this field will not be updated
      },
      {
        fields: ["username", "email"],
        returning: ["username", "email"],
        where: { id: req.params.id },
      }
    );

    res.status(200).send(user);
  } catch (error) {
    console.log("Error", error);
  }
});

router.delete("/:id", async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  res.status(200).send({ message: "User Removed Successfully" });
});

module.exports = router;
