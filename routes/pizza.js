const express = require("express");
const { findById } = require("../models/pizza");
const router = express.Router();
const Pizza = require("../models/pizza");

// Get All Pizza
router.get("/", async (req, res) => {
  try {
    const pizza = await Pizza.find();
    res.render("pizza/home", { pizza: pizza });
    console.log("Loaded pizza home");
  } catch (error) {
    console.log(error);
  }
});

// //Create Single Pizza

router.get("/create", (req, res) => {
  res.render("pizza/addPizza");
});

router.post("/create", async (req, res) => {
  const pizza = new Pizza({
    name: req.body.pizzaName,
    price: req.body.pizzaPrice,
    image: req.body.pizzaImage,
    description: req.body.pizzaDescription,
  });
  try {
    const newPizza = await pizza.save();
    console.log(newPizza);
    res.redirect("/");
  } catch (error) {
    // res.redirect("/");
    console.log(error);
  }
});

// //Get Single Pizza
router.get("/:id", async (req, res) => {
  let search = req.params.id;
  search = search.substring(1);
  try {
    const pizza = await Pizza.findById(search);
    res.render("pizza/viewPizza", { pizza: pizza });
  } catch (error) {
    console.log(error);
  }
});

//Update Single Pizza
router.get("/:id/edit", async (req, res) => {
  let search = req.params.id;
  // search = search.substring(1);

  try {
    let pizza = await Pizza.findById(search);
    res.render("pizza/editPizza", { pizza: pizza });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id/edit", async (req, res) => {
  let search = req.params.id;
  // search = search.substring(1);
  let pizza;
  try {
    pizza = await Pizza.findById(search);
    (pizza.name = req.body.pizzaName),
      (pizza.price = req.body.pizzaPrice),
      (pizza.image = req.body.pizzaImage),
      (pizza.description = req.body.pizzaDescription),
      await pizza.save();
    res.redirect("/");
    console.log("Saved Pizza!");
  } catch (error) {
    console.log(error);
  }
});

//Delete Single Pizza
router.delete("/:id/delete", async (req, res) => {
  let search = req.params.id;
  // search = search.substring(1);
  let pizza;
  try {
    pizza = await Pizza.findById(search);
    await pizza.remove();
    res.redirect("/");
    console.log("Pizza Deleted!");
  } catch (error) {
    console.log(error);
  }
});
// router.delete("/delete", (req, res) => {
//   console.log("Item Deleted!");
//   const pizza = findById()
//   res.redirect("/");
// });

module.exports = router;
