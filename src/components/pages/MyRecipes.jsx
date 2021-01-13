import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { ColorSet } from "../../global/ColorSet";
import { AuthContext } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Swing } from "../../global/GlobalStyle";

export const MyRecipes = () => {
  const { signOut, currentUser, favoritesRecipeId } = useContext(AuthContext);
  const history = useHistory();
  const [favoritesRecipe, setFavoritesRecipe] = useState([]);

  // console.log("Favorites Recipes", favoritesRecipe);

  const handleClick = (id) => {
    history.push(`/recipe-details/${id}`);
  };

  const fetchFavorites = async () => {
    //Fetch all recipes from the array
    try {
      if (favoritesRecipeId.length > 0) {
        const res = await fetch(
          `https://serene-refuge-17806.herokuapp.com/recipes/${favoritesRecipeId}`,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const json = await res.json();
        console.log(json);
        setFavoritesRecipe(json.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [favoritesRecipeId]);

  return (
    <Wrapper>
      {currentUser ? (
        <SignedInContainer>
          <NameContainer>
            <Text>Welcome back,</Text>
            <UserName>{currentUser.name}</UserName>
          </NameContainer>
          {favoritesRecipe.length > 0 ? (
            favoritesRecipe.map((favoriteRecipe) => {
              return (
                <Recipe
                  key={favoriteRecipe.title}
                  onClick={() => handleClick(favoriteRecipe.id)}
                >
                  <Img src={favoriteRecipe.image} />
                  <Title>{favoriteRecipe.title}</Title>
                </Recipe>
              );
            })
          ) : (
            <NoRecipesContainer>
              Add recipes to your favorites first
            </NoRecipesContainer>
          )}
          <ButtonContainer>
            <LogOut
              onClick={() => {
                signOut();
                history.push("/login");
              }}
            >
              Sign Out
            </LogOut>
          </ButtonContainer>
        </SignedInContainer>
      ) : (
        <NoUserContainer>
          <LinkContainer>
            <TextForLinks>
              You need an accout to save your favorite recipes!
            </TextForLinks>
            <StyledLinks to="/signup">Sign me up!</StyledLinks>
          </LinkContainer>
          <LinkContainer>
            <TextForLinks>You already have an account?</TextForLinks>
            <StyledLinks to="/login">Login</StyledLinks>
          </LinkContainer>
        </NoUserContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 80px;
  padding-bottom: 40px;
  height: 100%;
  min-height: 90vh;
  background-color: ${ColorSet.primaryExtraLight};
  @media (max-width: 500px) {
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

const SignedInContainer = styled.div`
  height: 100%;
  @media (max-width: 500px) {
  }
`;

const NameContainer = styled.div`
  height: 50px;
  background-color: ${ColorSet.dark};
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    height: 70px;
  }
`;

const NoUserContainer = styled(SignedInContainer)`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 500px) {
    height: 100%;
  }
`;

const LinkContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  @media (max-width: 500px) {
    display: inline-block;
    text-align: center;
    margin-top: 60px;
  }
`;

const UserName = styled.span`
  color: ${ColorSet.primary};
  margin: auto 15px;
  font-style: italic;
  font-size: 1.9rem;
  @media (max-width: 500px) {
    font-size: 1.6rem;
  }
`;

const Text = styled.span`
  color: white;
  font-size: 1.4rem;
  @media (max-width: 500px) {
    font-size: 1.7rem;
  }
`;

const Recipe = styled.button`
  margin: 20px;
  margin-left: 50px;
  width: 550px;
  background-color: white;
  color: ${ColorSet.dark};
  border: none;
  border-radius: 10px;
  box-shadow: 0px 10px 13px -7px gray, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
  }
`;

const NoRecipesContainer = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 550px;
  font-style: italic;
  color: ${ColorSet.dark};
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const Img = styled.img`
  border-radius: 15%;
  width: 85%;
  margin-top: 10px;
  @media (max-width: 500px) {
    width: 380px;
  }
`;

const Title = styled.p`
  font-size: 2rem;
  margin: 10px auto;
  min-height: 80px;
  @media (max-width: 500px) {
    font-size: 1.5rem;
    min-height: 30px;
  }
`;

const RecipesColumns = styled.div`
  column-count: 2;
  width: 100%;
  margin-bottom: 30px;
  @media (max-width: 500px) {
    column-count: 1;
  }
`;

const ButtonContainer = styled.div`
  background-color: transparent;
  bottom: 0;
  display: flex;
  justify-content: center;
  height: 120px;
  @media (max-width: 500px) {
  }
`;

const LogOut = styled.button`
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    animation: ${Swing} 1s ease;
  }
  box-shadow: 0px 10px 13px -7px gray;
  font-size: 1.3rem;
  height: 40px;
  width: 200px;
  margin-top: 50px;
  border: 3px solid ${ColorSet.red};
  color: ${ColorSet.red};
  background-color: white;
  border-radius: 10px;
  @media (max-width: 500px) {
    margin-top: 15px;
  }
`;

const TextForLinks = styled.p`
  font-size: 1.3rem;
  @media (max-width: 500px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;

const StyledLinks = styled(Link)`
  font-size: 1.3rem;
  color: ${ColorSet.dark};
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
