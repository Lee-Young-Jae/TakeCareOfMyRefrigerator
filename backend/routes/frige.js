const express = require("express");
const { User, Shopping, Cart, Frige, Recipe } = require("../models");
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

// localhost:3070/frige/list DELETE
router.delete("/list/:id", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    await Frige.destroy({
      where: {
        id: req.params.id,
      },
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

// localhost:3070/frige/recipe/list GET
router.get("/recipe/list", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send("로그인이 필요합니다.");
    }

    const frige = await Frige.findAll({
      where: {
        userId: req.user.id,
      },
    });

    const frigeList = frige.filter((v) => {
      const today = new Date();
      const expirationDate = new Date(v.expirationDate);
      return expirationDate > today;
    });

    const frigeName = frigeList.map((v) => v.name);

    let idList = {};

    for (let i = 0; i < frigeName.length; i++) {
      const recipe = await Recipe.findAll({
        where: {
          foodRecipe: {
            [Op.like]: `%${frigeName[i]}%`,
          },
        },
      });

      for (let j = 0; j < recipe.length; j++) {
        if (idList[recipe[j].id]) {
          idList[recipe[j].id] += 1;
        } else {
          idList[recipe[j].id] = 1;
        }
      }
    }

    const idListArr = Object.entries(idList);
    idListArr.sort((a, b) => b[1] - a[1]);

    const idListArr2 = idListArr.map((v) => v[0]);

    const idListArr3 = idListArr2.slice(0, 15);

    const recipeList = await Recipe.findAll({
      where: {
        id: idListArr3,
      },
    });

    if (recipeList.length === 0) {
      return res.status(201).send([]);
    }

    res.status(201).send(recipeList);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
