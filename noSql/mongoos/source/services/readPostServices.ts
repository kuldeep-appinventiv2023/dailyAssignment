import { Document } from "mongoose";
import Post from "../models/postsModel";

const readPostService = async (): Promise<Document[]> => {
  try {
    // Fetch all posts from the database using the 'find' method of the 'Post' model
    const posts: Document[] = await Post.find();
    return posts;
  } catch (err) {
    throw new Error("Error while fetching posts from the database");
  }
};

export default readPostService;
