import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null as { email: string; name?: string } | null,
  setIsAuthenticated: (value: boolean) => {},
  setUser: (user: { email: string; name?: string } | null) => {},
  logout: () => {
    localStorage.removeItem('authToken');
  },
});

export function useAuth() {
  const context = useContext(AuthContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !context.isAuthenticated) {
      // 这里可以添加验证token有效性的逻辑
      context.setIsAuthenticated(true);
      // 模拟获取用户信息
      context.setUser({
        email: 'user@example.com',
        name: 'QQ用户'
      });
    }
    setInitialized(true);
  }, []);

  if (!initialized) {
    return {
      isAuthenticated: false,
      user: null,
      setIsAuthenticated: () => {},
      setUser: () => {},
      logout: () => {},
    };
  }

  return context;
}
