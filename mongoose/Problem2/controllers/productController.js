const express = require("express");
const ProductModel = require("../model/productModel.js");
const router = express.Router();

// add a New Product

router.post("/", async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product is posted", Product: savedProduct });
  } catch (error) {
    res.json({ message: "error in code", Err: error });
  }
});

// find a newProduct or get a newProduct and find Product by querrries
router.get("/", async (req, res) => {
  try {
    const filter = req.query;
    console.log(filter);
    const getProduct = await ProductModel.find(filter);
    res.status(201).json({ Product: getProduct });
  } catch (error) {
    res.json({ message: "error to getProduct", error: error });
  }
});

// find a single Product

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const singleProduct = await ProductModel.findById(id);
    res.status(200).json({ singleProduct: singleProduct });
  } catch (error) {
    res.status(404).json({ error: "Product Not found!" });
  }
});

// how to update a Product by its id

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ updateProduct: updateProduct });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete a Product and how to delete a Product

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    res.status(200).json({ deleteProduct: deleteProduct });
  } catch (error) {
    res.status(404).json({ erorr: "Product not deleted" });
  }
});

module.exports = router;
