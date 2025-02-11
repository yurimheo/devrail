import React, { useState } from "react";
import axios from "axios";

const KakaoPayButton = ({ selectedPlan, price }) => {
    const [loading, setLoading] = useState(false);

    const handleKakaoPay = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:5000/api/payment/kakao-pay", {  // ✅ 변경
                selectedPlan,
                price: parseInt(price.replace(/[^0-9]/g, ""), 10), // 숫자만 추출
                paymentId: Date.now(), // 임시 결제 ID
            });

            const { next_redirect_pc_url } = response.data;

            // 🔥 팝업 방식으로 결제 창 띄우기
            const popup = window.open(next_redirect_pc_url, "kakaoPayPopup", "width=500,height=700");

            if (!popup) {
                alert("팝업 차단이 감지되었습니다. 팝업을 허용해주세요.");
            }
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
