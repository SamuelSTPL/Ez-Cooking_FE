import React, { useContext } from "react";
import styled from "styled-components";
import { ColorSet } from "../../global/ColorSet";

import { FiltersContext } from "../Context/FiltersContext";

export const FiltersDisplay = () => {
  const { ingredientFilters } = useContext(FiltersContext);

  return (
    <Wrapper>
      {ingredientFilters.length > 0 ? (
        <FiltersContainer>
          <List>
            {ingredientFilters.map((filter) => {
              return <Filter key={filter}>{filter}</Filter>;
            })}
          </List>
        </FiltersContainer>
      ) : (
        <FiltersContainer>
          <NoFilter>No ingredients added</NoFilter>
        </FiltersContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const FiltersContainer = styled.div`
  height: 40px;
  border-radius: 10px;
  width: 50%;
  margin: 30px auto;
  text-align: center;
  background-color: white;
  border: 3px solid ${ColorSet.primary};

  @media (max-width: 500px) {
    position: relative;
    margin: auto;
    width: 90%;
    display: flex;
    flex-direction: column;
  }
`;
const List = styled.ul`
  display: flex;
  justify-content: center;
  @media (max-width: 500px) {
  }
`;
const Filter = styled.li`
  font-size: 2rem;
  margin-right: 20px;
  font-style: italic;
  color: ${ColorSet.dark};
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const NoFilter = styled.p`
  color: ${ColorSet.dark};
  font-style: italic;
  align-self: center;
  padding-top: 10px;
  @media (max-width: 500px) {
    padding-top: 0px;
    margin-top: 0.8rem;
  }
`;
