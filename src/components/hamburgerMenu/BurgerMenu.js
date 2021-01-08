import React, { useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";

import { ColorSet } from "../../global/ColorSet";
import { MenuContext } from "../Context/MenuContext";

export const BurgerMenu = () => {
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  return (
    <HamburgerButton onClick={() => setOpenMenu(!openMenu)}>
      <GiHamburgerMenu />
    </HamburgerButton>
  );
};

const HamburgerButton = styled.button`
  background: transparent;
  position: absolute;
  visibility: hidden;
  font-size: 2.3rem;
  color: ${ColorSet.primary};
  border: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 500px) {
    visibility: visible;
    right: 2rem;
    top: 80px;
  }
`;
