const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendPaymentConfirmationEmail(to, orderId, amount) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: "✅ 결제 완료 안내",
        text: `고객님, 주문하신 상품의 결제가 완료되었습니다!\n\n주문번호: ${orderId}\n결제금액: ${amount}원\n감사합니다!`,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendPaymentConfirmationEmail };
