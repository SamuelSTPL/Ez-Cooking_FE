import React from "react";
import styled from "styled-components";

export const DropdownMenus = ({ data, setValue, value }) => {
  const handleChange = (ev) => {
    setValue(ev.target.value);
  };

  return (
    <List
      defaultValue={"none"}
      onChange={(ev) => {
        handleChange(ev);
      }}
    >
      {data.map((item) => {
        return (
          <Items key={item.name} value={item.name}>
            {item.name}
          </Items>
        );
      })}
    </List>
  );
};

const List = styled.select`
  border: none;
  &:focus {
    outline: none;
  }
  background-color: white;
  border-radius: 10px;
  padding: 5px 5px 5px 10px;
  height: 25px;
  @media (max-width: 500px) {
  }
`;
const Items = styled.option``;
