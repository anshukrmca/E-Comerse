import Category from "../models/categoryModel.js";
import Product from "../models/productsModel.js";

// new Product
export const createProduct = async (reqData) => {

  let topLevel = await Category.findOne({ name: reqData.topLevelCategory });
  if (!topLevel) {
    topLevel = new Category({
      name: reqData.topLevelCategory,
      level: 1,
    });
    await topLevel.save();
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLevelCategory,
    parentCategory: topLevel._id,
  });
  if (!secondLevel) {
    secondLevel = new Category({
      name: reqData.secondLevelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });
    await secondLevel.save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLevelCategory,
    parentCategory: secondLevel._id,
  });
  if (!thirdLevel) {
    thirdLevel = new Category({
      name: reqData.thirdLevelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });
    await thirdLevel.save();
  }

  const product = new Product({
    title: reqData.title,
    description: reqData.description,
    price: reqData.price,
    discountedPrice: reqData.discountedPrice,
    discountedPercentage: reqData.discountedPercentage,
    quantity: reqData.quantity,
    color: reqData.color,
    size: reqData.size,
    mainImage: reqData.mainImage,
    subImage: reqData.subImage,
    category: thirdLevel._id,
    brand: reqData.brand,
  });

  return await product.save();
};

// delete product
export const deleteProduct = async (productId) => {
  const product = await findProductById(productId);

  await Product.findOneAndDelete(productId);
  return "Product delete SuccessFull !";
};

// product update
export const updateProduct = async (productId, reqData) => {
  return await Product.findByIdAndUpdate(productId, reqData);
};

// find product by Id

export const findProductById = async (Id) => {
  const product = await Product.findById(Id).populate("category").exec();

  if (!product) {
    throw new Error(`Product not found by id : ${Id}`);
  }
  return product;
};

// get product

export const getAllProduct = async (reqQuery) => {

  let {
    category,
    color,
    size,
    minPrice,
    maxPrice,
    minDiscount,
    maxDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  pageSize = pageSize || 12;
  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], currrentPage: 1, totalPage: 0 };
    }
  }
  if (color) {
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );

    const colorRegex =
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

    query = query.where("color").regex(colorRegex);
  }
  if (size) {
    const sizeArray = size.split(","); // Assuming size is a comma-separated string
    query = query.where("size").in(sizeArray);
  }

  if (minPrice) {
    query = query.where("discountedPrice").gte(minPrice);
  }

  if (maxPrice != 0) {
    query = query.where("discountedPrice").lte(maxPrice);
  }

  // if (minDiscount) {
  // console.log(minDiscount)
  // query = await query.where("discountedPercentage").gt(minDiscount);
  // }

  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gte(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").lt(1);
    }
  }

  if (sort) {
    const sortDirection = sort === "price_heigh" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  if (!category && !color && !size && !minPrice && !maxPrice && !minDiscount && !maxDiscount && !stock) {
    // No filters provided, return all products
    query = Product.find().populate("category");
  }

  const totalProduct = await Product.countDocuments(query);

  if (pageNumber <= 0 || pageSize <= 0) {
    throw new Error("Invalid page number or page size");
  }
  const skip = (pageNumber - 1) * pageSize;
  if (skip < 0) {
    throw new Error("Invalid skip value");
  }

  query = query.skip(skip).limit(pageSize);
  const products = await query.exec();
  const totalPage = Math.ceil(totalProduct / pageSize);

  return { content: products, currrentPage: pageNumber, totalPage };
};


export const getProductByCategory = async ({ category }) => {
  try {
    const existCategory = await Category.findOne({ name: category });
    const product = await Product.find({ category: existCategory._id }).populate("category") .limit(15);
    return product;
  } catch (error) {
    throw new Error(error);
  }
};


export const createMultipleProduct = async (products) => {
  if (!Array.isArray(products)) {
    throw new Error("Products must be an array");
  }
  for (let product of products) {
    await createProduct(product);
  }
};
