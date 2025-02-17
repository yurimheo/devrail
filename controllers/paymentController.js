const { Payment, PaymentDetail, User } = require("../models");
const { requestKakaoPay, approveKakaoPay } = require("../services/kakaoPayService");

// ✅ 카카오페이 결제 요청
const createPayment = async (req, res) => {
    try {
        const { userId, items, totalAmount } = req.body;

        // ✅ Payment 테이블에 결제 정보 저장
        const newPayment = await Payment.create({
            amount: totalAmount,
            date: new Date(),
            status: "pending",
            user_id: userId
        });

        // ✅ PaymentDetail 테이블에 각 아이템 저장
        for (let item of items) {
            await PaymentDetail.create({
                item_description: item.description,
                quantity: item.quantity,
                price: item.price,
                payment_id: newPayment.payment_id,
            });
        }

        // ✅ 카카오페이 결제 요청
        const kakaoPayResponse = await requestKakaoPay(newPayment.payment_id, totalAmount, items);

        res.status(200).json({
            message: "✅ 결제 정보 저장 및 카카오페이 결제 요청 성공",
            paymentId: newPayment.payment_id,
            kakaoPayUrl: kakaoPayResponse.next_redirect_pc_url,
            tid: kakaoPayResponse.tid
        });

    } catch (error) {
        console.error("❌ 결제 생성 중 오류:", error);
        res.status(500).json({ message: "결제 생성 실패", error: error.message });
    }
};

// ✅ 카카오페이 결제 승인 처리
const confirmPayment = async (req, res) => {
    try {
        const { pg_token, tid, paymentId } = req.body;

        // ✅ 카카오페이 결제 승인 요청
        const kakaoPayResult = await approveKakaoPay(tid, pg_token);

        // ✅ Payment 테이블의 결제 상태 업데이트
        await Payment.update({ status: "completed" }, { where: { payment_id: paymentId } });

        res.status(200).json({
            message: "✅ 결제 승인 및 완료",
            paymentInfo: kakaoPayResult
        });

    } catch (error) {
        console.error("❌ 결제 승인 오류:", error);
        res.status(500).json({ message: "결제 승인 실패", error: error.message });
    }
};

module.exports = { createPayment, confirmPayment };
