import bcrypt from "bcrypt";
import Customer from "../models/customerModel";
import Session from "../models/sessionModel";
import jwt from "jsonwebtoken";
import { createClient } from "redis";
import { secretKey } from "../middleware/jwtMiddleware";
import mongoose from "mongoose";
import { connectToRedis ,  getFromRedis, setToRedis } from "../utils/redisClient";

// - - - - - - - - - - - - - - - Signup Services start - - - - - - - - - - - - - - - //
export async function signupCustomerServices(
  username: String,
  password: any,
  firstName: String,
  lastName: String,
  email: String,
  favoriteFood: String
) {
  const existingCustomer = await Customer.findOne({ email });

  if (existingCustomer) {
    throw new Error("Customer already exists. Please login.");
  }

  const hashedPassword = await bcrypt.hash(password, 2);

  const newCustomer = new Customer({
    username,
    password: hashedPassword,
    firstName,
    lastName,
    email,
    favoriteFood,
  });

  await newCustomer.save();
  return newCustomer;
}
// - - - - - - - - - - - - - - - Signup Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Login Services start - - - - - - - - - - - - - - - //
export async function loginCustomerServices(email: string, password: string) {
  const customer: any = await Customer.findOne({ email });

  if (!customer) {
    throw new Error("Customer not found ...");
  }

  const checkPassword = await bcrypt.compare(password, customer.password);
  if (!checkPassword) {
    throw new Error("Invalid password");
  }

  const activeSession = await Session.findOne({
    customerId: customer._id,
    isActive: true,
  });

  if (!activeSession) {
    const token = jwt.sign(
      { email: customer.email, id: customer._id },
      secretKey,
      { expiresIn: "1h" }
    );
    const session = new Session({
      customerId: customer._id,
      isActive: true,
    });

    await connectToRedis();

    let payload: any = {
      customerId: customer.id,
      deviceID: "12345",
      IP_Address: "127.0.0.1:8765",
      isActive: true,
    };
    const redisKey = `customer:${payload.customerId}`;
    await setToRedis(redisKey, JSON.stringify(payload));
    await session.save();
    return token;
  } else {
    return { message: "User Already logged in please logout first" };
  }
}
// - - - - - - - - - - - - - - - Login Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Profile Services Start - - - - - - - - - - - - - - - //
export async function getCustomerProfileService(email: string) {
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      throw new Error("User not found");
    }
    return customer;
  } catch (error) {
    throw new Error("Invalid email");
  }
}
// - - - - - - - - - - - - - - - Get Profile Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Update Profile Services Start - - - - - - - - - - - - - - - //
export async function updateCustomerProfileService(
  email: string,
  customerData: any
) {
  try {
    if (customerData.password) {
      const hashedPassword = await bcrypt.hash(customerData.password, 5);
      customerData.password = hashedPassword;
    }

    const updatedCustomerProfile = await Customer.findOneAndUpdate(
      { email: email },
      { $set: customerData },
      { new: true }
    );
    return updatedCustomerProfile;
  } catch (error) {
    throw new Error("Failed to update customer profile");
  }
}
// - - - - - - - - - - - - - - - Update Profile Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Delete Profile Services Start - - - - - - - - - - - - - - - //
export async function deleteCustomerProfileService(email: string) {
  try {
    const deleteCustomerProfile = await Customer.findOneAndDelete({ email });
    return deleteCustomerProfile;
  } catch (error) {
    throw new Error("Failed to delete customer profile");
  }
}
// - - - - - - - - - - - - - - - Delete Profile Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Forget password Services Start - - - - - - - - - - - - - - - //
export async function resetCustomerPasswordService(
  email: string,
  favoriteFood: string,
  newPassword: string
) {
  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return { success: false, message: "Customer does not exist" };
    }
    if (favoriteFood === customer.favoriteFood) {
      const hashedPassword = await bcrypt.hash(newPassword, 5);
      customer.password = hashedPassword;
      await customer.save();
      const token = jwt.sign({ email: customer.email }, "secret");
      return {
        success: true,
        message: "Password updated successfully and now you are logged in!",
        token,
      };
    } else {
      return { success: false, message: "Security question failed" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong" };
  }
}
// - - - - - - - - - - - - - - - Forget password Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Logout password Services start- - - - - - - - - - - - - - - //
export async function customerLogoutService(email: string) {
  try {
    const customer = await Customer.findOne({ email });
    const cid = customer?.id;
    const client = createClient();
    client.on("error", (error) => console.log("error"));

    await connectToRedis();

    const redisKey = `customer:${cid}`;
    const cachedData = await getFromRedis(redisKey)
    if(cachedData)
    {
        const customerData = JSON.parse(cachedData);
        customerData.isActive=false;
        await setToRedis(redisKey, JSON.stringify(customerData)); 
        return { success: true };

    }
    else
    {
        await Session.findOneAndUpdate(
            {
              customerId: mongoose.Types.ObjectId.createFromHexString(cid),
              isActive: true,
            },
            { $set: { isActive: false } }
          );
          return { success: true };
    }
  } catch (error) {
    console.log(error);
    return { success: false };  
  }
}
// - - - - - - - - - - - - - - - Logout password Services end - - - - - - - - - - - - - - - //
