import { APIError } from "../utils/ApiError.js";
import Post from "./../models/Post.js";
import Comment from "./../models/Comment.js";
import { APIResponse } from "./../utils/APIResponse.js";

const getPost = async (req, res) => {
  try {
    const post = await Post.find();

    if (!post) {
      throw new APIError(404, "No posts found");
    }

    return res
      .send(post)
      .json(new APIResponse(200, post, "Posts retrieved successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500);
    // .json(
    //   new APIResponse(
    //     error.statusCode,
    //     error.message || "Internal Server Error",
    //   ),
    // );
  }
};

const getPostWithId = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    const comment = await Comment.find({ postId });
    if (!post) {
      throw new APIError(404, `Post with ${postId} not found`);
    }
    if (!comment) {
      throw new APIError(404, "No comment found");
    }

    post.views += 1;
    await post.save();
    return res.status(200).json({
      post: post,
      comment: comment,
    });
    // .json(new APIResponse(200, post, "Post recieved successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500);
    // .json(
    //   new APIResponse(
    //     error.statusCode,
    //     error.message || "Internal Server Error",
    //   ),
    // );
  }
};

const write = async (req, res) => {
  try {
    const { userId, title, author, description, category, value } = req.body;
    const post = await Post.create({
      title,
      author,
      description,
      category,
      content: value,
      authorId: req.user._id,
    });
    return res.status(201).send(post);
    // .json(new APIResponse(201, post, "Successfully created a post"));
  } catch (error) {
    return res.status(error.statusCode || 500);
    // .json(
    //   new APIResponse(
    //     error.statusCode,
    //     error.message || "Internal Server Error",
    //   ),
    // );
  }
};

const editPostWithId = async (req, res) => {
  try {
    const postId = req.params.id;
    const data = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      throw new APIError(404, `Post with ID ${postId} not found`);
    }
    const updatedPost = await Post.findByIdAndUpdate(postId, data, {
      new: true,
    });
    return res
      .send(updatedPost)
      .json(new APIResponse(200, updatedPost, "Post updated successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500);
    // .json(
    //   new APIResponse(
    //     error.statusCode,
    //     error.message || "Internal Server Error",
    //   ),
    // );
  }
};

const deletePostWithId = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      throw new APIError(404, `Post with ID ${postId} not found`);
    }
    const deletedPost = await Post.findByIdAndDelete(postId);
    return res.send(deletedPost);
    // .json(new APIResponse(200, deletedPost, "Post deleted successfully"));
  } catch (error) {
    return res.status(error.statusCode || 500);
    // .json(
    //   new APIResponse(
    //     error.statusCode,
    //     error.message || "Internal Server Error",
    //   ),
    // );
  }
};

const commentPost = async (req, res) => {
  try {
    const postIdParams = req.params.id;
    const post = await Post.findById(postIdParams);
    if (!post) {
      throw new APIError(400, "NO post found");
    }
    const { userId, postId, comment } = req.body;
    console.log("userid", userId);
    const commentPost = await Comment.create({
      postId: postId,
      authorId: userId,
      text: comment,
    });
    return res.send(commentPost);
  } catch (error) {
    console.log("Error in the comment route", error);
  }
};

const likedUser = async (req, res) => {
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    throw new APIError(404, "No post found");
  }
  const { userId } = req.body;
  post.likes += 1;
  await post.save();
  post.likedBy = userId;
  await post.save();
  return res.send(post);
};
export {
  write,
  getPost,
  getPostWithId,
  editPostWithId,
  deletePostWithId,
  commentPost,
  likedUser,
};
