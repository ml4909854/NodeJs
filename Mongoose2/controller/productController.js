const express = require("express");
const ProductModel = require("../model/productModel.js")
const router = express.Router();

// Add a New Product
router.post("/", async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", Product: savedProduct });
  } catch (error) {
    res.status(400).json({ message: "Error creating Product", error: error.message });
  }
});

// Find Products or Get Products by Query
router.get("/", async (req, res) => {
  try {
    const filter = req.query;
    const Products = await ProductModel.find(filter);
    res.status(200).json({ Products });
  } catch (error) {
    res.status(400).json({ message: "Error fetching Products", error: error.message });
  }
});

// Find a Single Product by ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const Product = await ProductModel.findById(id);
    if (!Product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ Product });
  } catch (error) {
    res.status(400).json({ message: "Error fetching Product", error: error.message });
  }
});

// Update a Product by ID
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated successfully", Product: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: "Error updating Product", error: error.message });
  }
});

// Delete a Product by ID
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully", Product: deletedProduct });
  } catch (error) {
    res.status(400).json({ message: "Error deleting Product", error: error.message });
  }
});

module.exports = router;