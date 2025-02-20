import React, { useState } from "react";
import axios from "axios";

const KakaoPayButton = ({ selectedPlan, price, userEmail }) => {
    const [loading, setLoading] = useState(false);

    const handleKakaoPay = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/payments/kakao-pay", {
                selectedPlan,
                price: parseInt(price.replace(/[^0-9]/g, ""), 10),
                paymentId: Date.now(),
                userEmail, // ✅ 이메일 추가
            });

            const { next_redirect_pc_url, tid } = response.data;

            const popup = window.open(next_redirect_pc_url, "kakaoPayPopup", "width=500,height=700");

            if (!popup) {
                alert("팝업 차단이 감지되었습니다. 팝업을 허용해주세요.");
            }

            popup.onbeforeunload = async () => {
                await axios.post("http://localhost:5000/api/payments/kakao-pay-approve", {
                    tid,
                    pg_token: "success",
                    paymentId: Date.now(),
                    userEmail, // ✅ 이메일 추가
                });
            };
        } catch (error) {
            console.error("❌ 카카오페이 요청 실패:", error);
        }
        setLoading(false);
    };

    return (
        <button onClick={handleKakaoPay} disabled={loading} className="bg-yellow-400 text-black p-3 rounded-lg">
            {loading ? "로딩 중..." : "💳 카카오페이 결제"}
        </button>
    );
};

export default KakaoPayButton;
