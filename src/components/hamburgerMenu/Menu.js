import React, { useContext } from "react";
import { NavLink, Redirect } from "react-router-dom";
import styled from "styled-components";

import { ColorSet } from "../../global/ColorSet";
import { MenuContext } from "../Context/MenuContext";

export const Menu = () => {
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  return (
    <Wrapper open={openMenu}>
      <Link to="/home/quicksearch" onClick={() => setOpenMenu(!openMenu)}>
        Quick Search
      </Link>
      <Link to="/home/maincourse" onClick={() => setOpenMenu(!openMenu)}>
        Main Course Recipes
      </Link>
      <Link to="/home/dessert" onClick={() => setOpenMenu(!openMenu)}>
        Dessert Recipes
      </Link>
      <Link to="/home/vegetarian" onClick={() => setOpenMenu(!openMenu)}>
        Vegetarian Recipes
      </Link>
      <Link to="/home/vegan" onClick={() => setOpenMenu(!openMenu)}>
        Vegan Recipes
      </Link>
      <Redirect exact from="/" to="/home/quicksearch" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  visibility: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${ColorSet.dark};
  top: 142px;
  right: 0px;
  height: 60vh;
  width: 65%;
  @media (max-width: 500px) {
    visibility: ${(props) => (props.open ? "visible" : "hidden")};
  }
`;

const Link = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin-top: 70px;
  font-size: 1.5rem;
`;
