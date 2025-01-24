import React, { useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post("/api/contact", formData);  // response 변수 사용
      setResponseMessage("문의가 전송되었습니다. 감사합니다.");
      setFormData({ subject: "", email: "", message: "" });
      console.log(response); // 응답을 활용 (예: 성공 메시지 출력)
    } catch (error) {
      setResponseMessage("문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">문의하기</h2>

        <form onSubmit={handleFormSubmit} className="mt-8">
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700">
              제목
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              이메일
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700">
              내용
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded"
              rows="6"
              required
            ></textarea>
          </div>

          {responseMessage && (
            <p className="text-center text-green-500 mb-4">{responseMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "전송 중..." : "문의하기"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
