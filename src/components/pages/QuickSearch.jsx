import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { LoadingIcon } from "../LoadingIcon";

import {
  requestRecipesData,
  receivedRecipesDataError,
  receivedRecipesData,
} from "../../reducers/actions";
import { FiltersContext } from "../Context/FiltersContext";
import { Filters } from "../Filters/Filters";
import { FiltersDisplay } from "../Filters/FiltersDisplay";
import { ColorSet } from "../../global/ColorSet";
import { useHistory } from "react-router-dom";

export const QuickSearch = () => {
  const { combinedFilters, setIngredientFilters } = useContext(FiltersContext);
  const history = useHistory();
  const dispatch = useDispatch();
  let filteredRecipes = useSelector((state) => {
    return state.recipesReducer.filtered.recipes;
  });

  //Fetch recipes
  const fetchRecipesFromQuickSearch = async () => {
    dispatch(requestRecipesData());

    try {
      const res = await fetch(
        `https://serene-refuge-17806.herokuapp.com/quicksearch`,
        {
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(combinedFilters),
          method: "POST",
        }
      );

      const json = await res.json();
      dispatch(receivedRecipesData({ recipes: json.data, type: "filtered" }));
    } catch (error) {
      dispatch(receivedRecipesDataError());
      console.log(error.message);
    }
  };

  const handleHungryClick = () => {
    fetchRecipesFromQuickSearch();
  };

  const handleClick = (id) => {
    history.push(`/recipe-details/${id}`);
  };

  console.log(filteredRecipes);
  return (
    <Wrapper>
      <SearchContainer>
        <Filters />
        <FiltersDisplay />
        <ButtonsContainer>
          <Buttons onClick={() => handleHungryClick()}>I'm Hungry!</Buttons>
          <Clear onClick={() => setIngredientFilters([])}>Clear Filters</Clear>
        </ButtonsContainer>
      </SearchContainer>
      <RecipesColumns>
        {filteredRecipes ? (
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
  width: 100%;
`;
const SearchContainer = styled.div`
  height: 250px;
  background-color: ${ColorSet.primaryLight};
  border-bottom: 10px solid ${ColorSet.dark};
  @media (max-width: 500px) {
    width: 100%;
    padding: 7px 0px;
    height: 280px;
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media (max-width: 500px) {
    justify-content: space-around;
    margin: 20px auto;
    width: 90%;
  }
`;
const Buttons = styled.button`
  margin: 0 100px;
  box-shadow: 0px 10px 13px -7px gray;
  border: 3px solid ${ColorSet.primary};
  width: 200px;
  height: 40px;
  color: ${ColorSet.primary};
  font-weight: bold;
  border-radius: 10px;
  background-color: white;
  @media (max-width: 500px) {
    width: 160px;
    margin: auto;
    font-size: 1.1rem;
    margin-left: 15px;
  }
`;

const Clear = styled(Buttons)`
  color: ${ColorSet.red};
  border: 3px solid ${ColorSet.red};
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
  background-color: ${ColorSet.primaryExtraLight};
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
