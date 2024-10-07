import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-around;
`;

export const ContainerPack = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  align-items: center;
`;

export const PricingBox = styled.div<{ active: boolean }>`
  cursor: pointer;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  width: 170px;
  ${({ active }) => active && `border: solid 2px #fc6804;`};
  ${({ active }) => active && `pointer-events: none`};
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.2em;
`;

export const CurrentPrice = styled.div`
  color: #fc6804;
  font-size: 1.5em;
  margin: 10px 0;
`;

export const OldPrice = styled.div`
  color: #7f8c8d;
  text-decoration: line-through;
`;
