import React, { useState } from "react";
import useSelectPicker from "./hooks/useSelectPicker";
import {
  BoxContainer,
  Container,
  ContainerButtons,
  ContainerSelectedNumbers,
  LoteryContainer,
  Option,
  SelectButton,
} from "./styled";
import Pricing from "./Pricing";
import {
  disableNumbersMock,
  mock_disable_number_array,
} from "./mocks/disableNumbers";
import useRequestHandle from "./hooks/useRequestHandle";

const SelectPicker = () => {
  const startNumber = 0;
  const endNumber = 999;
  const [showMore, setShowMore] = useState(false);

  const { data, handleAddToCartProduct } = useRequestHandle();

  const {
    numbers,
    handleSelectedNumbers,
    handleSetMaxSelectedNumbers,
    handleResetSelectedNumbers,
    selectedNumbers,
    disabledNumbers,
    activePrice,
    setActivePrice,
    handleSelectedPack,
    selectedRandomNumber,
    handleRemoveSelectedNumber,
    handleSelectedOption,
    pack,
    details,
    group,
  } = useSelectPicker(startNumber, endNumber, data?.price ?? "");

  const filterNumbers = numbers?.filter((el) => parseInt(el) < 100 + 1);
  return (
    <BoxContainer>
      <SelectButton
        onClick={() => {
          handleResetSelectedNumbers();
          setActivePrice(0);
        }}
      >
        Resetear
      </SelectButton>
      <Pricing
        handleSetMaxSelectedNumbers={handleSetMaxSelectedNumbers}
        handleResetSelectedNumbers={handleResetSelectedNumbers}
        activePrice={activePrice}
        setActivePrice={setActivePrice}
        handleSelectedPack={handleSelectedPack}
        pack={pack}
        selectedNumbers={selectedNumbers}
        disabledNumbers={disabledNumbers}
      />

      <LoteryContainer>
        {!pack && (
          <ContainerSelectedNumbers>
            {selectedNumbers?.map((el) => {
              const disable = disabledNumbers.includes(el);
              return (
                <Option
                  active={
                    selectedNumbers && !disable
                      ? selectedNumbers.includes(el)
                      : false
                  }
                  disable={disable}
                  onClick={() => handleRemoveSelectedNumber(el)}
                >
                  {el}
                </Option>
              );
            })}
          </ContainerSelectedNumbers>
        )}
        <Container>
          {(!showMore ? filterNumbers : numbers)?.map((el) => {
            const disable = disabledNumbers.includes(el);
            return (
              <Option
                active={
                  selectedNumbers && !disable
                    ? selectedNumbers.includes(el)
                    : false
                }
                disable={disable}
                onClick={() =>
                  selectedNumbers?.includes(el)
                    ? handleRemoveSelectedNumber(el)
                    : handleSelectedOption(el)
                }
              >
                {el}
              </Option>
            );
          })}
        </Container>
        <ContainerButtons>
          {!showMore && (
            <SelectButton onClick={() => setShowMore(true)}>
              Mostrar mas
            </SelectButton>
          )}
          {showMore && (
            <SelectButton onClick={() => setShowMore(false)}>
              Mostrar menos
            </SelectButton>
          )}
          <SelectButton
            onClick={() => {
              handleSelectedNumbers(`${selectedRandomNumber()}`);
            }}
          >
            Elegir al azar
          </SelectButton>
          <SelectButton
            disabled={selectedNumbers.length <= 0}
            onClick={() => {
              handleAddToCartProduct(
                details?.quantity ?? 0,
                selectedNumbers,
                pack?.price ?? null
              );
            }}
          >
            Confirmar seleccion
          </SelectButton>
        </ContainerButtons>
      </LoteryContainer>
    </BoxContainer>
  );
};

export default SelectPicker;
