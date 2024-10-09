'use client';
import { useAuth } from '@/contexts/AuthContext';

const HomeScreen = () => {
  const authUser = useAuth();

  return <div>{authUser ? `Welcome, ${authUser.username}!` : 'Welcome!'}</div>;
};

export default HomeScreen;
