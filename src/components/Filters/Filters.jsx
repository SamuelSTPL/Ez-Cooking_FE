import React, { useContext } from "react";
import styled from "styled-components";

import { Diets, mealType } from "./filtersData";
import { IngredientsFilter } from "./IngredientsFilter";
import { DropdownMenus } from "./DropdownMenus";
import { FiltersContext } from "../Context/FiltersContext";
import { ColorSet } from "../../global/ColorSet";

export const Filters = () => {
  const {
    setMealFilters,
    setDietFilters,
    mealFilters,
    dietFilters,
  } = useContext(FiltersContext);

  return (
    <Wrapper>
      <IngredientInputContainer>
        <IngredientsFilter />
      </IngredientInputContainer>
      <DropdownWrapper>
        <DropdownContainers>
          <TitleContainerWrapper>
            <Title>Diets</Title>
          </TitleContainerWrapper>
          <DropdownMenus
            data={Diets}
            setValue={setDietFilters}
            value={mealFilters}
          />
        </DropdownContainers>
        <DropdownContainers>
          <TitleContainerWrapper>
            <Title>Meal Type</Title>
          </TitleContainerWrapper>
          <DropdownMenus
            data={mealType}
            setValue={setMealFilters}
            value={dietFilters}
          />
        </DropdownContainers>
      </DropdownWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  /* justify-content: space-around; */
  width: 100%;
  @media (max-width: 500px) {
    display: block;
  }
`;

const IngredientInputContainer = styled.div`
  @media (max-width: 500px) {
    margin-bottom: 20px;
  }
`;

const DropdownWrapper = styled.div`
  min-height: 100%;
  display: flex;
  margin: 1.5rem 0 0 200px;
  @media (max-width: 500px) {
    justify-content: space-around;
    margin-bottom: 20px;
    margin-left: 0px;
  }
`;

const DropdownContainers = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 500px) {
  }
`;

const TitleContainerWrapper = styled.div``;

const Title = styled.p`
  margin-right: 15px;
  margin-left: 30px;
  font-size: 1.3rem;
  color: ${ColorSet.dark};
  @media (max-width: 500px) {
    font-size: 1rem;
    margin-left: 0px;
    margin-right: 9px;
  }
`;
