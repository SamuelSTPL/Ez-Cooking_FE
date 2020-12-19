import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { LoadingIcon } from "../LoadingIcon";

import { ColorSet } from "../../global/ColorSet";
import {
  requestRecipesData,
  receivedRecipesDataError,
  receivedRecipesData,
} from "../../reducers/actions";
import { useHistory } from "react-router-dom";

export const Vegan = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let filteredRecipes = useSelector((state) => {
    return state.recipesReducer.vegan.recipes;
  });
  console.log(filteredRecipes);

  const fetchRecipesFromDiet = async () => {
    dispatch(requestRecipesData());
    try {
      const res = await fetch(
        `https://serene-refuge-17806.herokuapp.com/diet/vegan`
      );
      const json = await res.json();
      console.log(json);
      dispatch(receivedRecipesData({ recipes: json.data, type: "vegan" }));
    } catch (error) {
      dispatch(receivedRecipesDataError());
      console.log(error.message);
    }
  };
  const handleClick = (id) => {
    history.push(`/recipe-details/${id}`);
  };
  useEffect(() => {
    fetchRecipesFromDiet();
  }, []);

  return (
    <Wrapper>
      <RecipesColumns>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => {
            return (
              <RecipesContainer key={recipe.id}>
                <Recipe onClick={() => handleClick(recipe.id)}>
                  <Img src={recipe.image} />
                  <Title>{recipe.title}</Title>
                </Recipe>
              </RecipesContainer>
            );
          })
        ) : (
          <LoadingWrapper>
            <LoadingIcon />
          </LoadingWrapper>
        )}
      </RecipesColumns>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${ColorSet.primaryExtraLight};
  width: 100%;
  @media (max-width: 500px) {
    background-color: ${ColorSet.primaryLight};
  }
`;

const RecipesContainer = styled.div``;

const Recipe = styled.button`
  margin: 20px;
  margin-left: 50px;
  width: 700px;
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

const LoadingWrapper = styled.div`
  position: absolute;
  left: 55%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 500px) {
    left: 50%;
  }
`;
