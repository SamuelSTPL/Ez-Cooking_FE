import React from "react";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";

import { Sidebar } from "./Sidebar";
import { ColorSet } from "../global/ColorSet";

import {
  QuickSearch,
  Dessert,
  MainCourse,
  Vegan,
  Vegetarian,
} from "./pages/index";

export const Homepage = () => {
  return (
    <Wrapper>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <Route exact path="/home/quicksearch">
        <QuickSearch />
      </Route>
      <Route exact path="/home/dessert">
        <Dessert />
      </Route>
      <Route exact path="/home/maincourse">
        <MainCourse />
      </Route>
      <Route exact path="/home/vegetarian">
        <Vegetarian />
      </Route>
      <Route exact path="/home/vegan">
        <Vegan />
      </Route>
      <Redirect exact from="/" to="/home/quicksearch" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  @media (max-width: 500px) {
  }
`;
const SidebarWrapper = styled.div`
  width: 20%;
  @media (max-width: 500px) {
    visibility: hidden;
    width: 0%;
  }
`;
