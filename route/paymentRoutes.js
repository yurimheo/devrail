const express = require("express");
const axios = require("axios");
const db = require("../models"); // DB 모델 가져오기
require("dotenv").config();

const router = express.Router();
const KAKAO_ADMIN_KEY = process.env.KAKAO_ADMIN_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;

// ✅ 1. 결제 정보 저장 API
router.post("/save-payment", async (req, res) => {
    try {
        const { selectedPlan, price, userId } = req.body;

        const newPayment = await db.Payment.create({
            user_id: userId, 
            amount: price,
            date: new Date(),
            status: "pending",
        });

        res.json({ message: "결제 정보 저장 완료", paymentId: newPayment.payment_id });
    } catch (error) {
        console.error("❌ 결제 정보 저장 실패:", error);
        res.status(500).json({ error: "결제 정보 저장 실패" });
    }
});

// ✅ 2. 카카오페이 결제 요청 API
router.post("/kakao-pay", async (req, res) => {
    try {
        const { selectedPlan, price, paymentId } = req.body;

        const response = await axios.post(
            "https://kapi.kakao.com/v1/payment/ready",
            {
                cid: "TC0ONETIME",
                partner_order_id: `order_${paymentId}`,
                partner_user_id: "user_1234",
                item_name: `DevOps 학습 (${selectedPlan})`,
                quantity: 1,
                total_amount: price,
                tax_free_amount: 0,
                approval_url: `${FRONTEND_URL}/payment-success?paymentId=${paymentId}`,
                cancel_url: `${FRONTEND_URL}/payment-cancel`,
                fail_url: `${FRONTEND_URL}/payment-fail`,
            },
            {
                headers: {
                    Authorization: `KakaoAK ${KAKAO_ADMIN_KEY}`,
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            }
        );

        res.json({ next_redirect_pc_url: response.data.next_redirect_pc_url, tid: response.data.tid });
    } catch (error) {
        console.error("❌ 카카오페이 결제 요청 실패:", error);
        res.status(500).json({ error: "카카오페이 결제 요청 실패" });
    }
});

// ✅ 3. 카카오페이 결제 승인 API
router.post("/kakao-pay-approve", async (req, res) => {
    try {
        const { tid, pg_token, paymentId } = req.body;

        const response = await axios.post(
            "https://kapi.kakao.com/v1/payment/approve",
            {
                cid: "TC0ONETIME",
                tid,
                partner_order_id: `order_${paymentId}`,
                partner_user_id: "user_1234",
                pg_token,
            },
            {
                headers: {
                    Authorization: `KakaoAK ${KAKAO_ADMIN_KEY}`,
                    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                },
            }
        );

        // ✅ 결제 성공 시 DB 업데이트
        await db.Payment.update({ status: "approved" }, { where: { payment_id: paymentId } });

        res.json({ status: "success", paymentInfo: response.data });
    } catch (error) {
        console.error("❌ 카카오페이 결제 승인 실패:", error);
        res.status(500).json({ error: "카카오페이 결제 승인 실패" });
    }
});

module.exports = router;
