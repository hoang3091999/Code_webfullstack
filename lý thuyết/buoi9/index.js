import express from "express";
import Author from "./models/author.js";
import BookModel from "./models/book.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
const port = 8080;

mongoose
  .connect("mongodb://localhost:27017/mindx_buoi9")
  .then(async () => {
    console.log("kết nối mongodb thành công");
  })
  .catch((error) => {
    console.log("kết nối mongodb thất bại");
  });

app.get("", (req, res) => {
  res.status(201).send({
    message: "xin chào",
  });
});

app.post("/author", async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).send("xin điền thông tin");
    }
    const exitsEmail = await Author.findOne("email");
    if (exitsEmail) {
      res.status(400).send("tên email đã tồn tại");
    }
    const author = new Author({ name, email });
    await author.save();
    res.status(200).send({ message: "đăng ký tác giả thành công", author });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/book", async (req, res) => {
  try {
    const { name, descryption, authorId } = req.body;
    if (!name || !descryption || !authorId) {
      res.status(500).send({ message: "mời điền thông tin" });
    }
    const book = new BookModel({ name, descryption, authorId });
    await book.save();
    res.status(200).send({ message: "đăng ký thành công", data: book });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/books", async (req,res) => {
    try{ 
        const books = await BookModel.find({}).populate("authorId")
        res.status(200).json(books)
    }
    catch(err) {
        res.status(500).json({message: err.message})
    }

})

app.listen(port, () => {
  console.log("chạy web trên cổng 8080");
});
