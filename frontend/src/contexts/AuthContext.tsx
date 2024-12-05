import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  email: string;
  setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState<string>("");

  return (
    <AuthContext.Provider value={{ email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
