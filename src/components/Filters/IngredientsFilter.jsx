import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiltersContext } from "../Context/FiltersContext";

import { ColorSet } from "../../global/ColorSet";
import { Swing } from "../../global/GlobalStyle";

export const IngredientsFilter = () => {
  const [input, setInput] = useState("");
  const { setIngredientFilters } = useContext(FiltersContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const addFilter = (e) => {
    setIngredientFilters((state) => {
      let ingredients = [...state];
      if (ingredients.length < 3) {
        ingredients.push(input);
      }
      return ingredients;
    });
  };
  return (
    <IngredientsContainer
      onSubmit={(e) => {
        e.preventDefault();
        addFilter(e);
        setInput("");
      }}
    >
      <Label>Add up to 3 ingredients!</Label>
      <InputContainer>
        <Input value={input} type="text" onChange={handleChange}></Input>
        <Submit type="submit">Add</Submit>
      </InputContainer>
    </IngredientsContainer>
  );
};

const IngredientsContainer = styled.form`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin-top: 20px;
  margin-left: 40px;
  @media (max-width: 500px) {
    font-size: 1rem;
    margin-left: auto;
    display: block;
    text-align: center;
  }
`;
const Label = styled.label`
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 500px) {
    margin-top: 20px;
  }
`;

const Input = styled.input`
  font-size: 1.5rem;
  padding-left: 10px;
  border-radius: 10px;
  height: 30px;
  border: 3px solid ${ColorSet.primary};
  width: 270px;
  margin-left: 20px;
  &:focus {
    outline: none;
  }
  @media (max-width: 500px) {
    margin-left: 0;
    width: 230px;
  }
`;

const Submit = styled.button`
  box-shadow: 0px 10px 13px -7px gray;
  border: 3px solid ${ColorSet.primary};
  font-weight: bold;
  font-size: 1.1rem;
  width: 130px;
  border-radius: 10px;
  color: ${ColorSet.primary};
  background-color: white;
  margin-left: 15px;
  height: 35px;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    animation: ${Swing} 1s ease;
  }
  @media (max-width: 500px) {
    font-size: 1.1rem;
  }
`;
