import Color from "../models/colorModel.js";


export const createColor = async (req, res, next) => {
    try {
        let { colorName, colorCode } = req.body;
        const ColorName = await Color.findOne({ colorName })
        if (ColorName) {
            return res.status(401).json({ message: "Color already Exist" });
        }
        const color = await Color.create({ colorName, colorCode })
        res.status(200).json({ color, message: "Color Added !" });

    } catch (error) {
        next(error)
    }
}

export const getAllColor = async (req, res, next) => {
    try {
        const color = await Color.find()
        res.status(200).json(color);

    } catch (error) {
        next(error)
    }
};

export const deleteColor = async (req, res, next) => {
    try {
        await Color.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Color delete SuccessFull !" });

    } catch (error) {
        next(error)
    }
};

export const getColorbyId = async (req, res, next) => {
    try {
        const color = await Color.findById(req.params.id)
        res.status(200).json(color);

    } catch (error) {
        next(error)
    }
}

export const UpdateColor = async (req, res, next) => {
    try {
        const color = await Color.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json({message:"Color update Successfull !"});

    } catch (error) {
        next(error)
    }
}