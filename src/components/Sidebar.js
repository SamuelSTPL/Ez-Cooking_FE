import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components";

import { ColorSet } from "../global/ColorSet";
import { AuthContext } from "./Context/AuthContext";

export const Sidebar = () => {
  const history = useHistory();
  const { currentUser, signOut } = useContext(AuthContext);
  return (
    <Wrapper>
      <Li>
        <Link to="/home/quicksearch">Quick Search</Link>
      </Li>
      <Li>
        <Link to="/home/maincourse">Main Course Recipes</Link>
      </Li>
      <Li>
        <Link to="/home/dessert">Dessert Recipes</Link>
      </Li>
      <Li>
        <Link to="/home/vegetarian">Vegetarian Recipes</Link>
      </Li>
      <Li>
        <Link to="/home/vegan">Vegan Recipes</Link>
      </Li>
      {currentUser ? (
        <Li>
          <LogOut
            onClick={() => {
              signOut();
              history.push("/login");
            }}
          >
            Log Out
          </LogOut>
        </Li>
      ) : (
        <Li>
          <Link to="/login">Login</Link>
        </Li>
      )}
      <Li>
        <Link to="/signup">Sign Up</Link>
      </Li>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${ColorSet.primaryLight};
  height: 100%;
  border-right: 10px solid ${ColorSet.dark};
`;

const Link = styled(NavLink)`
  color: ${ColorSet.dark};
  text-decoration: none;
  margin-top: 70px;
  font-size: 1.7rem;
  &.active {
    border-bottom: 4px solid ${ColorSet.dark};
  }
`;

const Li = styled.li`
  list-style: none;
  font-weight: bold;
  margin-top: 4.7rem;
`;

const LogOut = styled.button`
  color: ${ColorSet.dark};
  font-size: 1.7rem;
  list-style: none;
  font-weight: bold;
  background-color: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
  &:focus {
  }
`;
