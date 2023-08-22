import Category from "../models/categoryModel";

// - - - - - - - - - - - - - - - Add Category Services start - - - - - - - - - - - - - - - //
export async function addCategoryServices(newCategoryData: any) {
    const newCategory = new Category(newCategoryData);

    await newCategory.save();
    return newCategory;
}
// - - - - - - - - - - - - - - - Add Category Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get All Category Services Start - - - - - - - - - - - - - - - //
export async function getAllCategoryService(email: string) {
    try {
        const allCategories = await Category.find();
        if (!allCategories) {
            throw new Error('Categories not found');
        }
        return allCategories;
    } catch (error) {
        throw new Error('Invalid email');
    }
}
// - - - - - - - - - - - - - - - Get All Category Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Category By id Services Start - - - - - - - - - - - - - - - //
export async function getCategoryByIdService(categoryId: string) {
    try {
        const category = await Category.findById(categoryId);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    } catch (error) {
        throw new Error('Invalid category ID');
    }
}
// - - - - - - - - - - - - - - - Get Category By id Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Category By Name Services Start - - - - - - - - - - - - - - - //
export async function getCategoryByNameService(categoryName: string) {
    try {
        const categories = await Category.find({ categoryName: { $regex: categoryName, $options: 'i' } });
        return categories;
    } catch (error) {
        throw new Error('Error fetching categories by name');
    }
}
// - - - - - - - - - - - - - - - Get Category By Name Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Category By City Name Services Start - - - - - - - - - - - - - - - //
export async function getCategoryByCityNameService(cityName: string) {
    try {
        const categories = await Category.find({ 'categoryAddress.city': cityName });
        return categories;
    } catch (error) {
        throw new Error('Error fetching categories by city name');
    }
}
// - - - - - - - - - - - - - - - Get Category By City Name Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Update Category By id Services Start - - - - - - - - - - - - - - - //
export async function updateCategoryByIdService(categoryId: any, updateData: any) {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });
        return updatedCategory;
    } catch (error) {
        throw new Error('Error updating category: ' + error);
    }
}
// - - - - - - - - - - - - - - - Update Category By id Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Delete Category by id Services Start - - - - - - - - - - - - - - - //
export async function deleteCategoryByIdService(categoryId: string) {
    try {
        const deletedCategory = await Category.findByIdAndRemove(categoryId);
        if (!deletedCategory) {
            throw new Error('Category not found');
        }
    } catch (error) {
        throw new Error('Error deleting category');
    }
}
// - - - - - - - - - - - - - - - Delete Category by id Services end - - - - - - - - - - - - - - - //
