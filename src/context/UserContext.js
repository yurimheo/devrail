import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api"; // ✅ axios 인스턴스 사용

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/check-auth", { withCredentials: true });
        setUser(res.data.user); // ✅ 로그인 후 최신 user 상태 업데이트
      } catch {
        setUser(null);
      }
    };
  
    fetchUser();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
