import mongoose from 'mongoose';
import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error('Error getting all products:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ sucess: false, message: 'Please provide all fields' });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error creating a new product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;
  product._id = id;
  console.log(`put product id '${id}': ${JSON.stringify(product)}`);
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ sucess: false, message: 'Please provide all fields' });
  }

  const newProduct = new Product(product);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Product Id' });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });
    res
      .status(201)
      .json({
        success: true,
        data: updatedProduct,
        message: 'Product updated successfully',
      });
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: 'Invalid Product Id' });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: `Product with id '${id}' deleted` });
  } catch (error) {
    console.error(
      'Error deleting the product with id "',
      id,
      '":',
      error.message
    );
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
