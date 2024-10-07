import { useState } from "react";
import {
  CurrentPrice,
  OldPrice,
  PricingBox,
  Title,
  Container,
  ContainerPack,
} from "./styled";
import { PackType } from "../hooks/types";
import { ContainerSelectedNumbers, Option } from "../styled";

const Pricing = ({
  handleSetMaxSelectedNumbers,
  handleResetSelectedNumbers,
  activePrice: active,
  setActivePrice: setActive,
  handleSelectedPack,
  pack,
  selectedNumbers,
  disabledNumbers,
}: {
  handleSetMaxSelectedNumbers: (value: number) => void;
  handleResetSelectedNumbers: () => void;
  activePrice: number;
  setActivePrice: (value: number) => void;
  handleSelectedPack: (value: PackType) => void;
  pack: PackType | null;
  selectedNumbers: string[];
  disabledNumbers: string[];
}) => {
  return (
    <Container>
      <ContainerPack>
        <PricingBox
          active={pack?.quantity === 4}
          onClick={() => {
            handleSelectedPack({
              price: "$70.000",
              subPrice: "$100.000",
              quantity: 4,
            });
          }}
        >
          <Title>4 Números</Title>
          <CurrentPrice>$70.000</CurrentPrice>
          <OldPrice>$100.000</OldPrice>
        </PricingBox>
        {pack?.quantity === 4 && (
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
                >
                  {el}
                </Option>
              );
            })}
          </ContainerSelectedNumbers>
        )}
      </ContainerPack>
      <ContainerPack>
        <PricingBox
          active={pack?.quantity === 6}
          onClick={() => {
            handleSelectedPack({
              price: "$100.000",
              subPrice: "$150.000",
              quantity: 6,
            });
          }}
        >
          <Title>6 Números</Title>
          <CurrentPrice>$100.000</CurrentPrice>
          <OldPrice>$150.000</OldPrice>
        </PricingBox>
        {pack?.quantity === 6 && (
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
                >
                  {el}
                </Option>
              );
            })}
          </ContainerSelectedNumbers>
        )}
      </ContainerPack>
    </Container>
  );
};

export default Pricing;
