import React, { useContext, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import { ColorSet } from "../../global/ColorSet";
import { AuthContext } from "../Context/AuthContext";

export const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordComfirmRef = useRef();
  const { signUp } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordComfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signUp(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );

      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };
  return (
    <Wrapper>
      <FormContainer>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSubmit}>
          {error && <MessageContainer>{error}</MessageContainer>}
          <Label>Name</Label>
          <Inputs type="text" ref={nameRef} />
          <Label>Email</Label>
          <Inputs type="email" ref={emailRef} />
          <Label>Password</Label>
          <Inputs type="password" ref={passwordRef} required />
          <Label>Password Comfirmation</Label>
          <Inputs type="password" ref={passwordComfirmRef} required />
          <Button disabled={loading} type="submit">
            Sign Up
          </Button>
        </Form>
        <OtherOptionsContainer>
          <StyledLink to="/login">Login</StyledLink>
        </OtherOptionsContainer>
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
  margin-top: 10px;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const Label = styled.label`
  color: ${ColorSet.dark};
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 20px;
  @media (max-width: 500px) {
    margin-top: 20px;
    font-size: 1.2rem;
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
  margin: 50px auto 60px auto;
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
  background-color: ${ColorSet.red};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
  margin-top: 0px;
  height: 30px;
  border-radius: 10px;
  @media (max-width: 500px) {
  }
`;
