const axios = require("axios");
require("dotenv").config();

// ✅ 카카오페이 결제 요청
const requestKakaoPay = async (paymentId, totalAmount, items) => {
    try {
        const response = await axios.post("https://kapi.kakao.com/v1/payment/ready", null, {
            params: {
                cid: process.env.KAKAO_PAY_CID,
                partner_order_id: `order_${paymentId}`,
                partner_user_id: `user_${paymentId}`,
                item_name: items.map(item => item.description).join(", "),
                quantity: items.reduce((acc, item) => acc + item.quantity, 0),
                total_amount: totalAmount,
                vat_amount: Math.round(totalAmount * 0.1),
                tax_free_amount: 0,
                approval_url: `${process.env.FRONTEND_URL}/payment-success?paymentId=${paymentId}`,
                cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
                fail_url: `${process.env.FRONTEND_URL}/payment-fail`,
            },
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO_PAY_ADMIN_KEY}`,
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        console.error("❌ 카카오페이 결제 요청 실패:", error);
        throw new Error("카카오페이 결제 요청 실패");
    }
};

// ✅ 카카오페이 결제 승인
const approveKakaoPay = async (tid, pg_token) => {
    try {
        const response = await axios.post("https://kapi.kakao.com/v1/payment/approve", null, {
            params: {
                cid: process.env.KAKAO_PAY_CID,
                tid,
                partner_order_id: `order_${Date.now()}`,
                partner_user_id: `user_${Date.now()}`,
                pg_token,
            },
            headers: {
                Authorization: `KakaoAK ${process.env.KAKAO_PAY_ADMIN_KEY}`,
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
        });

        return response.data;
    } catch (error) {
        console.error("❌ 카카오페이 결제 승인 실패:", error);
        throw new Error("카카오페이 결제 승인 실패");
    }
};

module.exports = { requestKakaoPay, approveKakaoPay };
