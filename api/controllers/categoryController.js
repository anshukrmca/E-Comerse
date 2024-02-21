import Category from "../models/categoryModel.js"



export const createCategory = async (req, res, next) => {
    const { topLevelCategory, secondLevelCategory } = req.body;

    try {
        let topLevel = await Category.findOne({ name: topLevelCategory });
        if (!topLevel) {
            topLevel = new Category({
                name: topLevelCategory,
                level: 1,
            });
            await topLevel.save();
        }

        let secondLevel = await Category.findOne({
            name: secondLevelCategory,
            parentCategory: topLevel._id,
        });
        if (!secondLevel) {
            secondLevel = new Category({
                name: secondLevelCategory,
                parentCategory: topLevel._id,
                level: 2,
            });
            await secondLevel.save();
        }
        res.status(200).json({ topLevel, secondLevel, message: "Category Added !" });
    } catch (error) {
        next(error)
    }
}

export const getTopLevelCategory = async (req, res, next) => {
    try {
        const topLevelCategory = await Category.find({ level: 1 })
        return res.status(200).json(topLevelCategory);
    } catch (error) {
        next(error);
    }
}

export const getSecondLevelCategory = async (req, res, next) => {
    try {
        const getSecondLevelCategory = await Category.find({ level: 2 }).populate('parentCategory', 'name');
        return res.status(200).json(getSecondLevelCategory);
    } catch (error) {
        next(error);
    }
}

export const getThirdLevelCategory = async (req, res, next) => {
    try {
        const getThirdLevelCategory = await Category.find({ level: 3 })
            .populate('parentCategory', 'name')
            .populate({
                path: 'parentCategory',
                populate: { path: 'parentCategory', select: 'name' }
            });
        return res.status(200).json({ getThirdLevelCategory });
    } catch (error) {
        next(error);
    }
}

export const updataCategory  = async (req, res, next) => {
    try {
        const { selectedCategory, TopId, SecId } = req.body;
        const update1 = await Category.findByIdAndUpdate(TopId, { name: selectedCategory.topLevelCategory }, { new: true });
        const update2 = await Category.findByIdAndUpdate(SecId, { name: selectedCategory.secondLevelCategory }, { new: true });

        if (update1 && update2) {
            res.status(200).json({ update1, update2, message: 'Category Update Successful!' });
        } else {
            res.status(404).json({ message: 'No matching document found' });
        }
    } catch (error) {
        next(error);
    }
};
