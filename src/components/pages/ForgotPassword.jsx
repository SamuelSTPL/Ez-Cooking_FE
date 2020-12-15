import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../Context/AuthContext";
import { ColorSet } from "../../global/ColorSet";

export const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };
  return (
    <Wrapper>
      <FormContainer>
        <Title>Reset</Title>
        <Title>Password</Title>
        <Form onSubmit={handleSubmit}>
          {message && <MessageContainer>{message}</MessageContainer>}
          {error && <ErrorContainer>{error}</ErrorContainer>}
          <Label>Email</Label>
          <Inputs type="email" ref={emailRef} />
          <Button disabled={loading} type="submit">
            Reset Password
          </Button>
        </Form>
        <OtherOptionsContainer>
          <StyledLink to="/login">Log In</StyledLink>
        </OtherOptionsContainer>
        <StyledLink to="/signup">Sign Up</StyledLink>
      </FormContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${ColorSet.primaryLight};
  height: 90vh;
  @media (max-width: 500px) {
    height: 85vh;
  }
`;

const FormContainer = styled.div`
  box-shadow: 5px 5px 15px 5px #a5a5a5;
  border-radius: 15px;
  background-color: white;
  display: flex;
  align-items: center;
  width: 25%;
  margin: auto;
  height: 750px;
  flex-direction: column;
  @media (max-width: 500px) {
    width: 75%;
    height: 590px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 80%;
  border-bottom: 1px solid ${ColorSet.dark};
  @media (max-width: 500px) {
  }
`;

const Title = styled.p`
  color: ${ColorSet.primary};
  font-weight: bold;
  font-style: italic;
  font-size: 3rem;
  margin-top: 40px;
  @media (max-width: 500px) {
  }
`;

const Label = styled.label`
  color: ${ColorSet.dark};
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 70px;
  @media (max-width: 500px) {
    margin-top: 40px;
  }
`;

const Inputs = styled.input`
  background-color: ${ColorSet.primaryLight};
  border-radius: 10px;
  border: none;
  height: 30px;
  padding-left: 15px;
  margin-top: 20px;
  &:focus {
    outline: none;
  }
  @media (max-width: 500px) {
    margin-top: 10px;
  }
`;

const Button = styled.button`
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 10px;
  border: none;
  height: 35px;
  width: 100%;
  margin-left: 15px;
  color: white;
  background-color: ${ColorSet.primary};
  align-self: center;
  margin: 100px auto 60px auto;
  box-shadow: 0px 10px 13px -7px gray, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  background: linear-gradient(225deg, #8bc450, #75a544);

  @media (max-width: 500px) {
    margin: 50px auto 20px auto;
  }
`;

const OtherOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  @media (max-width: 500px) {
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  margin-top: 10px;
  color: ${ColorSet.primary};
  &:hover {
    border-bottom: 1px solid ${ColorSet.primary};
  }
  @media (max-width: 500px) {
  }
`;

const MessageContainer = styled.div`
  background-color: ${ColorSet.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
  margin-top: 20px;
  height: 30px;
  border-radius: 10px;
  @media (max-width: 500px) {
  }
`;
const ErrorContainer = styled(MessageContainer)`
  background-color: ${ColorSet.red};
`;
