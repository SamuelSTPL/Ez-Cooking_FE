import React from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GlobalStyle } from "./global/GlobalStyle";
import { Homepage } from "./components/Homepage";
import { Menu } from "./components/hamburgerMenu/Menu";
import {
  MyRecipes,
  Login,
  SignUp,
  ForgotPassword,
  RecipeDetails,
} from "./components/pages/index";

function App() {
  return (
    <Router>
      {/* <Wrapper> */}
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/home" component={Homepage} />
        <Route exact path="/myrecipes" component={MyRecipes} />
        <Route exact path="/recipe-details/:id" component={RecipeDetails} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Redirect exact from="/" to="/home" />
      </Switch>
      <Menu />
      <Footer />
      {/* </Wrapper> */}
    </Router>
  );
}

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

export default App;
