import React from "react";
import styled from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";
import { ColorSet } from "../global/ColorSet";

export const LoadingIcon = () => {
  return (
    <Loading>
      <PacmanLoader color={ColorSet.primary} />
    </Loading>
  );
};

const Loading = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
