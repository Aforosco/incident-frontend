


interface LoginResponse {
  token: string;
  user?: any;
}
export const login = async (email: string, password: string) => {
  try {
    const res = await fetch("https://localhost:7094/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }

    const data: LoginResponse = await res.json();
    
    if (data.token) {
      localStorage.setItem("token", data.token);
      
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
    }
    
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};