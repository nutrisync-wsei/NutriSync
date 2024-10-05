"use client";
import Button from "@/ui/components/controls/Button";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const WelcomeScreen = () => {
  const router = useRouter();

  return (
    <Container>
      <Button variant="primary" onClick={() => router.push("login")}>
        Sign in with email
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 20px 25px;
  gap: 20px;
`;

export default WelcomeScreen;
