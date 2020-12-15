import React from "react";
import styled from "styled-components";

import { ColorSet } from "../global/ColorSet";

export const Footer = () => {
  return (
    <Wrapper>
      Don't forget to add the secret ingredient, <Love>Love</Love>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  /* align-self: flex-end; */
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  bottom: 0px;
  height: 40px;
  width: 100%;
  background-color: ${ColorSet.dark};
  font-size: 1.1rem;
  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;
const Love = styled.span`
  color: ${ColorSet.primary};
  font-weight: bolder;
  margin-left: 10px;
  font-size: 1.3rem;
  font-style: italic;
  @media (max-width: 500px) {
    font-size: 1.1rem;
  }
`;
