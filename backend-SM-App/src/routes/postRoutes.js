import express from "express";
import { addPost, getAllPosts, getOnePost, getOnePhotoPost, getOneVideoPost, getOnePostByUID, updatePost, deletePost } from "../controllers/postsControllers.js";

const postRouter = express.Router();

// Add new post
postRouter.post("/posts", addPost);

// Fetch all posts
postRouter.get("/posts", getAllPosts);

// Fetch one post by post ID
postRouter.get("/posts/:post_id", getOnePost);

//Fetch a one photo post
postRouter.get("/posts/photo/:post_id",getOnePhotoPost);

//Fetch a one video post
postRouter.get("/posts/videos/:post_id",getOneVideoPost);

// Fetch a post and user by user id
postRouter.get("/posts/:UserID", getOnePostByUID)

// Update post
postRouter.put("/posts/:post_id", updatePost);

// Delete post
postRouter.delete("/posts/:post_id", deletePost);

export default postRouter;
