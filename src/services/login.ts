<<<<<<< HEAD



interface LoginResponse {
  token: string;
  user?: any;
}
export const login = async (email: string, password: string) => {
=======
// src/services/login.ts

interface LoginResponse {
  token: string;
  role: string;
  email: string;
  fullName?: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
>>>>>>> email-feature
  try {
    const res = await fetch("https://localhost:7094/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
      body: JSON.stringify({ email, password }),
=======
      body: JSON.stringify({ 
        Email: email,    
        Password: password }),
>>>>>>> email-feature
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Login failed");
    }

    const data: LoginResponse = await res.json();
    
<<<<<<< HEAD
    if (data.token) {
      localStorage.setItem("token", data.token);
      
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
=======
    // Store token and user info
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);
    if (data.fullName) {
      localStorage.setItem("fullName", data.fullName);
>>>>>>> email-feature
    }
    
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
<<<<<<< HEAD
  localStorage.removeItem("user");
=======
  localStorage.removeItem("role");
  localStorage.removeItem("email");
  localStorage.removeItem("fullName");
>>>>>>> email-feature
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
<<<<<<< HEAD
=======
};

export const getRole = (): string | null => {
  return localStorage.getItem("role");
};

export const isAdmin = (): boolean => {
  return getRole() === "Admin";
>>>>>>> email-feature
};