const express = require("express");
const { createPayment, confirmPayment } = require("../controllers/paymentController");

const router = express.Router();

// ✅ 결제 생성 및 카카오페이 요청
router.post("/create-payment", createPayment);

// ✅ 결제 승인 처리
router.post("/confirm-payment", confirmPayment);

module.exports = router;
