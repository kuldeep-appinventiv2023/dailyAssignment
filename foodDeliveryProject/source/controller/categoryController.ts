import { Request, Response } from 'express';
import {
    addCategoryServices,
    getAllCategoryService,
    getCategoryByIdService,
    getCategoryByNameService,
    getCategoryByCityNameService,
    updateCategoryByIdService,
    deleteCategoryByIdService
} from '../services/categoryService';

// - - - - - - - - - - - - - - - Add Category Controller start - - - - - - - - - - - - - - - //
export async function addCategoryController(req: Request, res: Response) {
    const newCategoryData = req.body;
    try {
        const newCategory = await addCategoryServices(newCategoryData);
        res.status(201).json({ success: true, message: 'Category added successfully', category: newCategory });
    } catch (error) {
        console.error('Category add nahi hua:', error);
        res.status(500).json({ success: false, message: 'An error occurred while adding the category' });
    }
}
// - - - - - - - - - - - - - - - Add Category Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get All Category Controller Start - - - - - - - - - - - - - - - //
export async function getAllCategoryController(req: Request, res: Response) {
    const email = req.body.email;
    try {
        const categories = await getAllCategoryService(email);
        res.send(categories);
    } catch (error) {
        console.error('Error during fetching categories:', error);
        res.status(401).send(error);
    }
}
// - - - - - - - - - - - - - - - Get All Category Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Category By id Controller Start - - - - - - - - - - - - - - - //
export async function getCategoryByIdController(req: Request, res: Response) {
    const categoryId = req.params.id;

    try {
        const category = await getCategoryByIdService(categoryId);
        res.status(200).json({ success: true, category });
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the category' });
    }
}
// - - - - - - - - - - - - - - - Get Category By id Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Category By Name Controller Start - - - - - - - - - - - - - - - //
export async function getCategoryByNameController(req: Request, res: Response) {
    const categoryName = req.body.categoryName;

    try {
        const categories = await getCategoryByNameService(categoryName);
        res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error('Error fetching categories by name:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the categories' });
    }
}
// - - - - - - - - - - - - - - - Get Category By Name Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Category by City Name Controller Start - - - - - - - - - - - - - - - //
export async function getCategoryByCityNameController(req: Request, res: Response) {
    const cityName = req.body.cityName;

    try {
        const categories = await getCategoryByCityNameService(cityName);
        res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error('Error fetching categories by city name:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching the categories' });
    }
}
// - - - - - - - - - - - - - - - Get Category by City Name Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Update Category Controller Start - - - - - - - - - - - - - - - //
export async function updateCategoryByIdController(req: Request, res: Response) {
    const categoryId = req.params.id;
    console.log("----", categoryId);
    const updateData = req.body;

    try {
        const updatedCategory = await updateCategoryByIdService(categoryId, updateData);
        res.status(200).json({ success: true, message: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the category' });
    }
}
// - - - - - - - - - - - - - - - Update Category Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Delete Category by ID Controller Start - - - - - - - - - - - - - - - //
export async function deleteCategoryByIdController(req: Request, res: Response) {
    const categoryId = req.params.id;

    try {
        await deleteCategoryByIdService(categoryId);
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the category' });
    }
}
// - - - - - - - - - - - - - - - Delete Category by ID Controller end - - - - - - - - - - - - - - - //
