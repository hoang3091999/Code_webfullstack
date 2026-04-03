import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const defaultusersname = "khoa";
const defaultpassword = "123456";
const secretKey = "mysecretkey";

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === username && password === password) {
    // thường token sẽ đc đính kèm _id, có thể thêm username, email
    const token = jwt.sign({ username: defaultusersname }, secretKey, {
      expiresIn: "5m",
    }); // 5 phút sau token hết hạn => thời gian càng ngắn thì càng bảo mật
    res.send(token);
    res.send("Login successful!");
  } else {
    res.status(401).send("Invalid username or password");
  }
});

app.get("/user", (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")?.[1] || "";
    if (!token) {
        return res.status(401).send("Unauthorized");
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        res.send({ username: decoded.username });
    } catch (err) {
        res.status(401).send("Invalid token " + err.message);
    }
  res.send({ username: "defaultusersname", password: "defaultpassword" });
});

app.listen(8080, () => {
  console.log("Example app listening on port 8080!");
});
