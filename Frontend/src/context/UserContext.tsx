import React, { createContext, useContext, useState } from "react";

export interface UserProfile {
  name: string;
  firstName: string;
  email: string;
  mobile: string;
  age: string;
  dob: string;
  gender: string;
  avatar: string; // Avatar initial e.g., "G"
  profileImage: string | null; // URI or base64 string for custom profile image
  // memberTier: string;
  // savedAmount: number;
  healthScore: number;
  income: number;
  expenses: number;
  savings: number;
}

const initialUser: UserProfile = {
  name: "Guruprasath K",
  firstName: "Guruprasath",
  email: "guru@gmail.com",
  mobile: "9999999999",
  age: "25",
  dob: "20/08/1999",
  gender: "Male",
  avatar: "G",
  profileImage: null,
  // memberTier: "Gold member",
  // savedAmount: 5243,
  healthScore: 72,
  income: 85000,
  expenses: 48200,
  savings: 36800,
};

interface UserContextType {
  user: UserProfile;
  updateUser: (updatedFields: Partial<UserProfile>) => void;
}

const UserContext = createContext<UserContextType>({
  user: initialUser,
  updateUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(initialUser);

  const updateUser = (updatedFields: Partial<UserProfile>) => {
    setUser((prev) => {
      const nextName = updatedFields.name ?? prev.name;
      const firstName = nextName.trim().split(" ")[0] || nextName;
      const avatar = nextName.trim() ? nextName.trim()[0].toUpperCase() : "G";
      return {
        ...prev,
        ...updatedFields,
        firstName,
        avatar: updatedFields.avatar || avatar,
      };
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
