import React, { useContext } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";

import { ColorSet } from "../../global/ColorSet";
import { MenuContext } from "../Context/MenuContext";
import { AuthContext } from "../Context/AuthContext";

export const Menu = () => {
  const { openMenu, setOpenMenu } = useContext(MenuContext);
  const { currentUser, signOut } = useContext(AuthContext);
  const history = useHistory();

  console.log(currentUser);

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
      <Link to="/signup" onClick={() => setOpenMenu(!openMenu)}>
        Sign Up
      </Link>
      {currentUser ? (
        <LogOut
          onClick={() => {
            signOut();
            history.push("/login");
            setOpenMenu(!openMenu);
          }}
        >
          Log Out
        </LogOut>
      ) : (
        <Link to="/login" onClick={() => setOpenMenu(!openMenu)}>
          Login
        </Link>
      )}
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
  top: 140px;
  right: 0px;
  height: 75%;
  width: 65%;
  @media (max-width: 500px) {
    visibility: ${(props) => (props.open ? "visible" : "hidden")};
  }
`;

const Link = styled(NavLink)`
  color: white;
  text-decoration: none;
  margin-top: 50px;
  font-size: 1.5rem;
`;

const LogOut = styled.button`
  color: ${ColorSet.red};
  text-decoration: none;
  margin-top: 50px;
  font-size: 1.5rem;
  background-color: transparent;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;
