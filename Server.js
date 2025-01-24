const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "devrail2025@gmail.com", // 이메일 주소
    pass: "orderofthephoenix5@", // 이메일 비밀번호
  },
});

app.post("/api/contact", (req, res) => {
  const { subject, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "devrail2025@gmail.com", // 이메일 주소
    subject: `문의: ${subject}`,
    text: `이메일: ${email}\n내용: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("메일 전송 실패");
    }
    console.log("Email sent: " + info.response);
    res.status(200).send("메일 전송 성공");
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
