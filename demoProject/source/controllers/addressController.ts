import Address from "../models/addressModel";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

//add address api
export async function addAddress(req: Request, res: Response) {

    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = <JwtPayload>jwt.verify(token, "secret");
    const userId = decodedToken.userId;

  const { houseNo, streetNo, area, landmark, city, state, country, pinCode } = req.body;

  try {
    const newAddress = await Address.create({
      houseNo: houseNo,
      streetNo: streetNo,
      area: area,
      landmark: landmark,
      city: city,
      state: state,
      country: country,
      pinCode: pinCode,
      userId,
    });
    res.status(201).json({ message: "Address Added Successfully...." , newAddress });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Adress not added" });
  }
}

//update address api
export async function updateAddress(req: Request, res: Response) {
  const id = req.params.id;
  const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = <JwtPayload>jwt.verify(token, "secret");
    const userId = decodedToken.userId;
    const { houseNo, streetNo, area, landmark, city, state, country, pinCode } = req.body;
  
  const updateAddress = await Address.findOne({ where: { id: id } });
  try {
    if (!updateAddress) {
      return res.status(404).json({ message: "address not found" });
    }
    await Address.update(
      {
        houseNo: houseNo,
      streetNo: streetNo,
      area: area,
      landmark: landmark,
      city: city,
      state: state,
      country: country,
      pinCode: pinCode,
      },
      { where: { id: id } }
    );
    return res.status(200).send("address updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

//delete address api
export async function deleteAddress(req: Request, res: Response) {
  const id = req.params.id;
  const token = req.headers.authorization?.split(" ")[1];
    console.log(token);
    if (!token) {
      return res.status(401).send("Authorization token not found");
    }
    const decodedToken = <JwtPayload>jwt.verify(token, "secret");
    const userId = decodedToken.userId;
  try {
    await Address.destroy({
        where: { id: req.params.id },
      });
    res.status(200).json({ message: "address deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
}
