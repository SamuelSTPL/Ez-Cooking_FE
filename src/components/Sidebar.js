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
      <Li>
        <Link to="/signup">Sign Up</Link>
      </Li>
      {currentUser ? (
        <Li>
          <LogOut
            onClick={() => {
              signOut();
              history.push("/login");
            }}
          >
            <LogOutText>Log Out</LogOutText>
          </LogOut>
        </Li>
      ) : (
        <Li>
          <Link to="/login">Login</Link>
        </Li>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 80px;
  padding-top: 30px;
  position: fixed;
  width: 16.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${ColorSet.primaryLight};
  height: 100%;
  border-right: 5px solid ${ColorSet.dark};
`;

const Link = styled(NavLink)`
  color: ${ColorSet.dark};
  text-decoration: none;
  margin-top: 70px;
  font-size: 1.4rem;
  position: relative;

  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: -4px;
    content: "";
    display: block;
    height: 4px;
    left: 50%;
    position: absolute;
    background: ${ColorSet.dark};
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover:after {
    width: 100%;
    left: 0;
  }
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

const LogOutText = styled.span`
  color: ${ColorSet.red};
`;
