import React from 'react';
import styled from 'styled-components';

import SearchIcon from '@mui/icons-material/Search';

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const InputField = styled.input`

  padding: 10px;
  border-radius: 5px;
  border: 1px solid #235170;
  background-color: transparent;
  font-size: 16px;
  color: #ffff;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px #235170;
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const InputComponent = ({ label, value }) => {
  const handleChange= (event)=> {
    localStorage.setItem("filterInput", category);
    console.log(event.target.value)
  }
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputField onChange={handleChange} type="text" value={value}  />
      <IconContainer>
        <SearchIcon />
      </IconContainer>
    </InputContainer>
  );
};

export default InputComponent;
