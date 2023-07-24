import { Request, Response } from "express";
import readPostService from "../services/readPostServices";

const readPostController = async (req: Request, res: Response) => {
  try {
    // Call the 'readPostService' to fetch posts from the database
    const posts = await readPostService();

    // Send the fetched posts as a response
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Error while fetching posts" });
  }
};

export default readPostController;
