import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { createClient } from "redis";

interface JWTPayload {
  email: string;
}

export const secretKey = "kuldeep@321";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Please provide Authorization token" });
  }
  const client = createClient();
  client.on("error", (error)=> console.log("error"));
  await client.connect()

  try {
    const decoded:any = jwt.verify(token, secretKey) as JWTPayload;
    console.log(decoded);
    req.body.email = decoded.email;

    const customerId = decoded.id;
    const redisKey: string = `customer:${customerId}`;
    const cachedData = await client.get(`${redisKey}`);
    if (cachedData) {
      const adminData = JSON.parse(cachedData);
      if (adminData.isActive == true) {
        await next();
      } else {
        return res.status(401).json({ message: "Session expired / Customer logged out" });
      }
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: error });
  }
}
