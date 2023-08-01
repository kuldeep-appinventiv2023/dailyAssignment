import Product from "../models/productModel";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Op } from "sequelize";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

//------------------------------------------ Add product API start------------------------------------------ //
export async function addProduct(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = <JwtPayload>jwt.verify(token, "secret");
    const userId = decodedToken.userId;

    const { product_name, description, basePrice, title } = req.body;
    const product = await Product.create({
      product_name: product_name,
      description: description,
      basePrice: basePrice,
      title: title,
      userId,
    });
    console.log("Product added", product);
    return res.status(200).json({ result: "product added" });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ result: "Please send proper detail" });
  }
}
//------------------------------------------ Add product API end ------------------------------------------ //

//------------------------------------------ Get product API end ------------------------------------------ //
export async function getProduct(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = <JwtPayload>jwt.verify(token, "secret");
    const userId = decodedToken.userId;

    const product: any = await Product.findAll({
      where: { userId: { [Op.ne]: userId } },
    });
    console.log("Product added.........", product);
    return res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ result: "wrong user id" });
  }
}
//------------------------------------------ Get product API end ------------------------------------------ //

//------------------------------------------ Update product API start ------------------------------------------ //
export async function updateProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = <JwtPayload>jwt.verify(token, "secret");
    const userId = decodedToken.userId;

    const { product_name, description, basePrice, title } = req.body;
    await Product.update(
      {
        product_name: product_name,
        description: description,
        basePrice: basePrice,
        title: title,
      },
      { where: { id: id } }
    );
    return res.status(200).send("Product updated successfully......");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Unable to update product");
  }
}
//------------------------------------------ Update product API end ------------------------------------------ //

//------------------------------------------ Delete product API start ------------------------------------------ //
export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = <JwtPayload>jwt.verify(token, "secret");
    const userId = decodedToken.userId;
    await Product.destroy({
      where: { id: req.params.id },
    });
    res.send("Product delete");
  } catch (err) {
    console.error(err);
    return res.status(400).send("wrong user id");
  }
}
//------------------------------------------ Delete product API end ------------------------------------------ //

//------------------------------------------ Bidding API start ------------------------------------------ //
export async function bidding(req: Request, res: Response) {
  try {
    const { id, newBiddingPrice } = req.body;

    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = <JwtPayload>jwt.verify(token, "secret");
    const userId = decodedToken.userId;

    const product: any = await Product.findOne({ where: { id } });

    if(product){
      const check1:any = await Product.findOne({where:{id: id,seller_id:userId}});
      if(check1){
        return res.status(400).send("You cannot bid on your own product")
      }
      else if (product.basePrice >= newBiddingPrice) {
        return res
          .status(400)
          .send("bidding prize should greater than basePrice");
      }
      const result = await Product.update(
        { newBiddingPrice: newBiddingPrice, bidderId: userId },
        { where: { id: id } })

    } 
    else{
      return res.status(400).send("Product not found");
    }
    return res.status(200).send("Bidding done");
  } catch (err) {
    console.error(err);
    return res.status(200).json({ result: "wrong product id" });
  }
}
//------------------------------------------ Bidding API end ------------------------------------------ //

//------------------------------------------ Add product Image API end ------------------------------------------ //
export async function addProductImage(req: Request, res: Response) {
    console.log("part1");
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = <JwtPayload>jwt.verify(token, "secret");
    const userId = decodedToken.userId;

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const product_id = Number(req.params.id);
  console.log("part2");
  if (!product_id) {
    return res.status(400).json({ error: "No Product id found" });
  }

  const imagePath = "./public/uploads/" + req.file.originalname;
  console.log("part3");
  const productPic = fs.readFileSync(path.resolve(imagePath));

  const product:any = await Product.findOne({ where: { userId : userId , id: product_id } });

  if (!product) {
    return res.status(400).json({ error: "No Such Product Found" });
  }

  product.productimages = productPic;

  await product.save();

  fs.unlink(path.resolve(imagePath), (err) => {
    console.log("error in file delete:", err);
  });

  return res
    .status(200)
    .json({ message: "Product Image updated successfully" });
}
//------------------------------------------ Add Product image API end ------------------------------------------ //
