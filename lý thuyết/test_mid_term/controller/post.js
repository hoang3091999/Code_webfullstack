import Post from "../model/post.js";
export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const user = req.user;
        const newPost = await Post.create({
            content,
            userId : user._id,
        });
        res.status(201).json({ message: "Tạo bài viết thành công", data: newPost });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};