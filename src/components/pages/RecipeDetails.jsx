import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../Context/AuthContext";
import { LoadingIcon } from "../LoadingIcon";
import { ColorSet } from "../../global/ColorSet";

export const RecipeDetails = () => {
  const [recipeData, setRecipeData] = useState();
  const { addToFavorites, currentUser } = useContext(AuthContext);
  let { id } = useParams();

  if (currentUser) {
    console.log(currentUser);
  }
  // console.log(id);
  console.log(recipeData);
  const fetchSingleRecipe = async () => {
    try {
      const res = await fetch(
        `https://serene-refuge-17806.herokuapp.com/recipe/${id}`
      );
      const json = await res.json();
      setRecipeData(json.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchSingleRecipe();
  }, []);

  return (
    <Wrapper>
      {recipeData ? (
        <RecipeContainer>
          {recipeData.image && <Img src={recipeData.image} />}
          <TitleAndScoreContainer>
            <Title>{recipeData.title}</Title>
            <Score>
              {recipeData.spoonacularScore && recipeData.spoonacularScore}
            </Score>
          </TitleAndScoreContainer>

          <DietsContainer>
            {recipeData.diets.length > 0 ? (
              recipeData.diets.map((diet) => {
                return <Diet key={diet}>{diet}</Diet>;
              })
            ) : (
              <NoDiets>No diets specifications</NoDiets>
            )}
          </DietsContainer>
          <IngredientsContainer>
            {recipeData.extendedIngredients &&
              recipeData.extendedIngredients.map((ingredient) => {
                return (
                  <Ingredient key={ingredient.id}>
                    {ingredient.original}
                  </Ingredient>
                );
              })}
          </IngredientsContainer>
          <InstructionsContainer>
            {recipeData.analyzedInstructions && (
              <div>
                {recipeData.analyzedInstructions[0] ? (
                  recipeData.analyzedInstructions[0].steps.map((step) => {
                    return (
                      <Instructions>
                        <InstructionNumber>{step.number}-</InstructionNumber>
                        {step.step}
                      </Instructions>
                    );
                  })
                ) : (
                  <div>
                    No instructions
                    <NoInstructions>No instructions provided</NoInstructions>
                  </div>
                )}
              </div>
            )}
          </InstructionsContainer>
          <AddToFavsContainer>
            <FavButton onClick={() => addToFavorites(recipeData.id)}>
              Add to my recipes!
            </FavButton>
          </AddToFavsContainer>
        </RecipeContainer>
      ) : (
        <Loading>
          <LoadingIcon />
        </Loading>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px 0 100px 0;
  width: 100%;
  height: 100%;
  background-color: ${ColorSet.primaryLight};
  @media (max-width: 500px) {
    padding: 0;
  }
`;

const Loading = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${ColorSet.primaryLight};
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 85vh;
  width: 38%;
  margin: auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 10px 13px -7px gray, 5px 5px 15px 5px rgba(0, 0, 0, 0);
  @media (max-width: 500px) {
    background-color: transparent;
    box-shadow: none;
    width: 90%;
    margin: 0px auto;
    padding-top: 20px;
  }
`;

const Img = styled.img`
  border-radius: 10px;
  width: 650px;
  margin-top: 30px;
  @media (max-width: 500px) {
    width: 450px;
    margin-top: 0px;
  }
`;

const DietsContainer = styled.div`
  margin-top: 20px;
  height: 40px;
  display: flex;
  width: 60%;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  border-radius: 50px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Diet = styled.span`
  color: ${ColorSet.dark};
  @media (max-width: 500px) {
  }
`;

const TitleAndScoreContainer = styled.div`
  width: 80%;
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${ColorSet.dark};
  @media (max-width: 500px) {
  }
`;

const Score = styled.div`
  margin-left: 20px;
  border: 3px solid ${ColorSet.dark};
  padding: 10px;
  background-color: white;
  border-radius: 50%;
  color: ${ColorSet.primary};
  font-weight: bolder;
  font-size: 1.7rem;
  @media (max-width: 500px) {
    font-size: 1.2rem;
    padding: 10px;
    margin-left: 10px;
  }
`;

const IngredientsContainer = styled.div`
  border-top: 5px solid ${ColorSet.dark};
  margin: 20px auto;
  background-color: white;
  padding: 15px;
  width: 90%;
  @media (max-width: 500px) {
    border-radius: 10px;
    display: flex;
    border: none;
    flex-direction: column;
  }
`;

const Ingredient = styled.p`
  font-size: 1.3rem;
  color: ${ColorSet.dark};
  @media (max-width: 500px) {
    margin: 5px 0 5px 15px;
  }
`;

const InstructionsContainer = styled.div`
  width: 90%;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-top: 5px solid ${ColorSet.dark};
  @media (max-width: 500px) {
    width: 90%;
    border: none;
    border-radius: 10px;
  }
`;

const Instructions = styled.p`
  font-size: 1.3rem;
  color: ${ColorSet.dark};
  margin-top: 10px;
  @media (max-width: 500px) {
  }
`;

const AddToFavsContainer = styled.div`
  background-color: transparent;
  bottom: 0;
  display: flex;
  justify-content: center;
  height: 120px;
  @media (max-width: 500px) {
  }
`;

const FavButton = styled.button`
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }
  box-shadow: 0px 10px 13px -7px gray, 5px 5px 15px 5px rgba(0, 0, 0, 0);

  height: 40px;
  width: 200px;
  margin-top: 15px;
  border: 3px solid ${ColorSet.primary};
  color: ${ColorSet.primary};
  background-color: white;
  border-radius: 10px;
  font-size: 1.3rem;
  @media (max-width: 500px) {
  }
`;

const InstructionNumber = styled.span`
  margin-right: 5px;
  font-weight: bold;
`;

const NoInstructions = styled.p`
  font-style: italic;
  color: ${ColorSet.dark};
`;

const NoDiets = styled.p`
  font-style: italic;
  color: ${ColorSet.dark};
`;
