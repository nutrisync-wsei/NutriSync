"use client";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/ui/components/controls/Button";

const HomeScreen = () => {
  const { authUser, logout } = useAuth();

  return (
    <div>
      {authUser ? `Welcome, ${authUser.username}!` : "Welcome!"}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default HomeScreen;
