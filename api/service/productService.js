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
  }

  const product = new Product({
    title: reqData.title,
    description: reqData.description,
    price: reqData.price,
    discountedPrice: reqData.discountedPrice,
    discountedPresentage: reqData.discountedPresentage,
    quantity: reqData.quantity,
    color: reqData.color,
    size: reqData.size,
    mainImage: reqData.mainImage,
    SubImage: reqData.SubImage,
    category: reqData.category,
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

export const gettAllProduct = async (reqQuery) => {
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

  pageSize = pageSize || 10;

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
    const sizeSet = new Set(size);
    query = (await query.where("size.name")).includes([...sizeSet]);
  }
  if (minPrice) {
    query = await query.where("discountedPrice").get(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = await query.where("discountedPersent").gt(minDiscount);
  }

  if (stock) {
    if (stock == "in_stock") {
      query = query.where("quentity").gt(0);
    } else if (stock == "out_of_stock") {
      query = query.where("quentity").gt(1);
    }
  }

  if (sort) {
    const sortDirection = sort === "price_height" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  const totalProduct = await Product.countDocuments(query);
  const skip = (pageNumber - 1) * pageSize;

  query = query.skip(skip).limit(pageSize);
  const products = await query.exec();
  const totalPage = Math.ceil(totalProduct / pageSize);

  return { content: products, currrentPage: pageNumber, totalPage };
};


// create multiple product for admin
export const createMultipleProduct = async (products) => {
  for (let product of products) {
    await createProduct(product);
  }
};