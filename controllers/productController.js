const mongoose = require('mongoose')
const Product = require('../models/product')

const createProduct = async (req,res) => {
    try{   
        const {name, sku, status, images, color, description, card_description, category, subcategory} = req.body;

        if (!name || !status || !sku || !description || !category || !subcategory) {
        return res.status(400).json({ message: 'Missing required fields' });
        }

        const newProduct = new Product({
            name,
            sku,
            status,
            images,
            color,
            description,
            card_description,
            category,
            subcategory
        })

        const savedProduct = await newProduct.save();
        return res.status(201).json({message: 'Product successfully created!'});

    }catch(err){
        console.error('Error creating product:', err);
        return res.status(500).json({ message: 'Server error while creating product.' });
    }
}

const updateProduct = async(req,res) => {
    try{
        const { id } = req.params;
        const updateData = req.body;

        const updateProduct = await Product.findByIdAndUpdate(
            id,
            {$set: updateData},
            {new: true, runValidators: true}
        );

        if (!updateProduct){
            return res.status(404).json({message: 'Product not found.'});
        }

        return res.status(200).json({ message: 'Product updated!'})

    }catch (err){
        console.error('Error updating product',err);
        return res.status(500).json({message: 'Server error while updating product.'})
    }
}

const updateStatus = async(req,res) => {
    try{
        const { id } = req.params
        const status = req.body

        const updateStatus = await Product.findByIdAndUpdate(
            id,
            {$set: {status} },
            {new: true, runValidators: true}
        )
        
        if(!updateStatus){
            return res.status(404).json({ message: "Product not found." });
        }

        return res.status(200).json({ message: 'Product status updated!'})

    }catch (err){
        console.error('Error updating status',err);
        return res.status(500).json({message: 'Server error while updating product status.'})

    }
}

const deleteProduct = async (req,res) => {
    try{
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID." });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found." });
    }

    return res.status(200).json({ message: "Product deleted successfully!" });

    }catch (err){
        console.error('Error deleting product',err)
        return res.status(500).json({message: 'Server error while deleting product.'})
    }
}

module.exports = {createProduct, updateProduct , updateStatus , deleteProduct}; 