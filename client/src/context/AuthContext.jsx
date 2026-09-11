import {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // Register user
  const register = async (name, email, password) => {
    const response = await fetch(
      "/api/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  };
const verifyUser = async (otp, activationToken) => {
  const response = await fetch(
    "/api/user/verify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        activationToken,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "OTP verification failed"
    );
  }

  return data;
};
  // Login
  const login = async (email, password) => {
    const response = await fetch(
      "/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);

    return data;
  };

  // Get logged-in user's profile
const getProfile = async () => {
  if (!token) {
    return;
  }

  const response = await fetch(
    "/api/user/profile",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch profile"
    );
  }

  setUser(data.user);

console.log("Logged-in user:", data.user);

return data.user;
};

useEffect(() => {
  if (token) {
    getProfile();
  }
}, [token]);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

 return (
  <AuthContext.Provider
    value={{
      user,
      token,
      register,
      verifyUser,
      login,
      getProfile,
      logout,
    }}
  >
    
    
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};