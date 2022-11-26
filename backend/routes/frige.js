const express = require("express");
const { User, Shopping, Cart, Frige } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

// localhost:3070/frige/list GET
router.get("/list", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    const frige = await Frige.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["expirationDate", "ASC"]],
    });
    res.status(201).send(frige);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// localhost:3070/frige/list POST
router.post("/list/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    await Frige.create({
      name: req.body.name,
      UserId: req.user.id,
      expirationDate: req.body.expiration,
      type: req.body.category,
    });

    //all frige
    const allFriges = await Frige.findAll({
      where: {
        UserId: req.user.id,
      },
      order: [["expirationDate", "ASC"]],
    });

    res.status(201).send(allFriges);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
