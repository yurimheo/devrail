const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

const router = express.Router();
// ✅ 카카오 로그인 API (자동 회원가입 포함)
router.get("/kakao-auth", async (req, res) => {
    const { code } = req.query;

    try {
        // 🔹 카카오 OAuth 토큰 요청
        const tokenResponse = await axios.post("https://kauth.kakao.com/oauth/token", null, {
            params: {
                grant_type: "authorization_code",
                client_id: process.env.KAKAO_CLIENT_ID,
                client_secret: process.env.KAKAO_CLIENT_SECRET,
                redirect_uri: "http://localhost:5000/api/kakao/kakao-auth",
                code,
            },
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        const accessToken = tokenResponse.data.access_token;

        // 🔹 카카오 사용자 정보 가져오기
        const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        console.log("📌 카카오 API 응답:", JSON.stringify(userResponse.data, null, 2));

        const kakaoUser = userResponse.data;
        const email = kakaoUser.kakao_account?.email;

        // ✅ 닉네임 가져오기
        let name = kakaoUser.kakao_account?.profile?.nickname || "카카오 유저";

        if (!email) {
            return res.status(400).json({ error: "이메일 정보를 가져올 수 없습니다." });
        }

        // 🔹 DB에서 이메일 조회
        let user = await User.findOne({ where: { email } });

        // 🔹 없으면 자동 회원가입
        if (!user) {
            console.log("🔹 새로운 카카오 유저 등록:", email, name);
            user = await User.create({
                name,  // ✅ 카카오 닉네임 저장
                email,
                role: "free", 
                login_provider: "kakao",
                password: null, 
            });
        } else {
            // ✅ 기존 유저라도 이름이 없다면 업데이트
            if (!user.name || user.name === "카카오 유저") {
                await user.update({ name });
                console.log("🔄 기존 유저의 이름 업데이트:", name);
            }
        }

        // 🔹 JWT 발급
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        // 🔹 로그인 유지
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000, // 1시간 유지
        });

        return res.status(200).json({ message: "카카오 로그인 성공!", user });
    } catch (error) {
        console.error("❌ 카카오 로그인 실패:", error);
        return res.status(500).json({ error: "카카오 로그인 중 오류 발생" });
    }
});
module.exports = router;
