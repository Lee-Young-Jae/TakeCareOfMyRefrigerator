const express = require("express");
const { User, Shopping, Cart } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

// localhost:3070/shopping/list GET
router.get("/list", async (req, res, next) => {
  try {
    const shopping = await Shopping.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(201).send(shopping);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// localhost:3070/shopping POST
router.post("/list/:name", async (req, res, next) => {
  try {
    const name = req.params.name;
    if (!name || name === "") {
      return res.status(201).send("장바구니명이 없습니다.");
    }

    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    const shopping = await Shopping.create({
      name,
    });

    await shopping.setUser(req.user.id);

    const allShopping = await Shopping.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(201).send(allShopping);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// localhost:3070/shopping/:id DELETE
router.delete("/list/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(201).send("장바구니명이 없습니다.");
    }

    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    const shopping = await Shopping.findOne({
      where: {
        id,
      },
    });

    if (!shopping) {
      return res.status(201).send("존재하지 않는 장바구니입니다.");
    }

    await shopping.destroy();

    const allShopping = await Shopping.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(201).send(allShopping);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// localhost:3070/shopping/cart GET
router.get("/cart/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const cart = await Cart.findAll({
      where: {
        ShoppingId: id,
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(201).send({ cart, ShoppingId: id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// localhost:3070/shopping/cart POST
router.post("/cart", async (req, res, next) => {
  try {
    const { name } = req.body;
    const { ShoppingId } = req.body;

    if (!name || name === "") {
      return res.status(401).send("장바구니명이 없습니다.");
    }

    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    const cart = await Cart.create({
      name,
    });

    await cart.setShopping(ShoppingId);

    const allCart = await Cart.findAll({
      where: {
        ShoppingId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(201).send(allCart);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// localhost:3070/shopping/cart/:id DELETE
router.delete("/cart/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id || id === "") {
      return res.status(401).send("장바구니가 존재하지 않습니다.");
    }

    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    const cart = await Cart.findOne({
      where: {
        id,
      },
    });

    if (!cart) {
      return res.status(401).send("존재하지 않는 장바구니입니다.");
    }

    await cart.destroy();

    const allCart = await Cart.findAll({
      where: {
        ShoppingId: cart.ShoppingId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.status(201).send(allCart);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
