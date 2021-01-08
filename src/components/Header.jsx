import React, { useContext } from "react";
import styled from "styled-components";
import { GiMeal } from "react-icons/gi";
import { NavLink } from "react-router-dom";

import { ColorSet } from "../global/ColorSet";
import { BurgerMenu } from "./hamburgerMenu/BurgerMenu";
import { MenuContext } from "./Context/MenuContext";

export const Header = () => {
  const { setOpenMenu } = useContext(MenuContext);

  return (
    <Wrapper>
      <TitleContainer>
        <Logo>
          <GiMeal />
        </Logo>
        <Title>
          Ez<TitleSpan>Cooking</TitleSpan>
        </Title>
      </TitleContainer>
      <NavBar>
        <Ul>
          <Li>
            <StyledNavLink to="/home" onClick={() => setOpenMenu(false)}>
              Home
            </StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink
              exact
              to="/myrecipes"
              onClick={() => setOpenMenu(false)}
            >
              My Recipes
            </StyledNavLink>
          </Li>
        </Ul>
      </NavBar>
      <BurgerMenu />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  z-index: 2;
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  height: 80px;
  color: white;
  background-color: ${ColorSet.dark};

  @media (max-width: 500px) {
    flex-direction: column;
    height: 140px;
    position: relative;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 40px;
  @media (max-width: 500px) {
    padding: 10px;
    margin: 0;
  }
`;

const Logo = styled.span`
  margin-top: 5px;
  font-size: 3.5rem;
  margin-right: 20px;
  color: ${ColorSet.primary};
  @media (max-width: 500px) {
    font-size: 2.5rem;
  }
`;

const Title = styled.p`
  font-size: 3rem;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

const TitleSpan = styled.span`
  font-style: italic;
  color: ${ColorSet.primary};
`;

const NavBar = styled.nav`
  position: absolute;
  right: 50px;

  @media (max-width: 500px) {
    position: relative;
    right: 0px;
    width: 80%;
    margin-top: 15px;
    margin-left: -100px;
  }
`;

const Ul = styled.ul`
  display: flex;
  @media (max-width: 500px) {
    /* margin-left: 40px; */
    /* justify-content: space-around; */
  }
`;

const Li = styled.li`
  transition: all 0.2s ease-in-out;
  margin-right: 30px;

  @media (max-width: 500px) {
    margin-right: 0;
  }

  &:hover {
    transform: scale(1.1);
    font-weight: bolder;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  padding: 5px;

  @media (max-width: 500px) {
    font-size: 1.4rem;
    margin-left: 3rem;
  }

  &.active {
    color: ${ColorSet.primary};
    border-bottom: 4px solid ${ColorSet.primary};
  }
`;
