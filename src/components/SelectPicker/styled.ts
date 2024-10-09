import styled from "styled-components";

export const BoxContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LoteryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;
export const Option = styled.div<{ disable: boolean; active: boolean }>`
  width: 50px;
  height: 50px;
  padding: 10px;
  border-radius: 100%;
  background-color: ${({ disable }) =>
    disable ? "#dcdbdc !important" : "#EEF8FF"};
  ${({ disable }) => disable && "pointer-events: none"};
  color: black;
  ${({ active }) => active && "background: #fc6804; color: white;"};

  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  user-select: none;
  &:hover {
    border: 2px solid #fc6804;
    cursor: pointer;
  }
`;
export const SelectButton = styled.button`
  margin-left: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 220px;
  height: 50px;
  background-color: #fc6804 !important;
  color: white !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px !important;
  &:hover {
    background-color: white;
    color: #fc6804;
    border: #fc6804 solid 2px;
  }
  cursor: pointer;
`;
export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (min-width: 0px) and (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ContainerSelectedNumbers = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;
