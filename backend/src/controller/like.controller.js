import LikeRepository from "../repository/like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async getPostLikes(req, res, next) {
    const { postID } = req.params;
    try {
      const result = await this.likeRepository.getPostLikes(postID);
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async likePost(req, res, next) {
    const { postID } = req.params;
    const userID = req.userID;
    try {
      const result = await this.likeRepository.likePost(postID, userID);
      res.status(200).json({ status: true, message: result });
    } catch (error) {
      next(error);
    }
  }
}
