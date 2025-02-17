import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api"; // ✅ axios 인스턴스 사용

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/check-auth", { withCredentials: true });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };

    // ✅ 쿠키가 있는 경우만 사용자 정보 가져오기
    if (document.cookie.split("; ").find((row) => row.startsWith("token="))) {
      fetchUser();
    } else {
      setUser(null);
    }
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
