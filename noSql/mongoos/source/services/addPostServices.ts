import Post from '../models/postsModel';

const addPostServices = async (image_URL:string, caption:string ) => {
    const newPost = new Post ({
        //userId
        image_URL,
        caption
    })
    await newPost.save();
    return newPost

}

export default addPostServices;