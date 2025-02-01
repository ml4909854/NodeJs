const express = require("express");
const ProductModel = require("../model/ProductModel.js");
const router = express.Router();

// post Product
router.post("/", async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (error) {
    res.json(error);
  }
});

// get the data

router.get("/", async (req, res) => {
  try {
    const filter = req.query;
    const getProduct = await ProductModel.find(filter);
    res.json(getProduct);
  } catch (error) {
    res.json(error);
  }
});

// get a separate Product

router.get("/:id", async (req, res) => {
  try {
    const getProduct = await ProductModel.findById(req.params.id);
    res.json(getProduct);
  } catch (error) {
    res.json(error);
  }
});

// updata a Product
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateProduct);
    res.json(updateProduct);
  } catch (error) {
    res.json(error);
  }
});

// delete a Product
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
