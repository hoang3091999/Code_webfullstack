import Post from "../model/post.js";
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const user = req.user;
    const newPost = await Post.create({
      content,
      userId: user._id,
    });
    res.status(201).json({ message: "Tạo bài viết thành công", data: newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const UpdatePost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res
        .status(400)
        .json({ message: "Nội dung bài viết không được để trống" });
    }
    const { _id } = req.params;
    const newPost = await Post.findOneAndUpdate(
      { _id },
      { content, updatedAt: new Date() },
      { new: true },
    );    
    if (!newPost) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }
    res
      .status(200)
      .json({ message: "Cập nhật bài viết thành công", data: newPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
