import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api"; // ✅ axios 인스턴스 사용

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/check-auth");
        setUser(res.data.user); // ✅ 상태 즉시 업데이트
      } catch {
        setUser(null); // ✅ 인증 실패 시 user 상태 초기화
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
