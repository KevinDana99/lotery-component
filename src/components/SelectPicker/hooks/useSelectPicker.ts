import { useEffect, useState } from "react";
import { PackType } from "./types";
import { parse } from "path";
import { mock_disable_number_array } from "../mocks/disableNumbers";
import { Verify } from "crypto";

//
/*
not react
let disableNumbersArray: typeof mock_disable_number_array = [];
*/
declare var disableNumbersArray: typeof mock_disable_number_array;

const useSelectPicker = (
  startNumber: number,
  endNumber: number,
  pricePerItem: string
) => {
  const [activePrice, setActivePrice] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [numbers, setNumbers] = useState<string[]>([]);
  const [maxSelectedNumbers, setMaxSelectedNumbers] = useState(endNumber);
  const [pack, setPack] = useState<PackType | null>(null);
  const [details, setDetails] = useState<PackType | null>(null);
  const [group, setGroup] = useState<any>(null);
  const [disableNumbers, setDisableNumbers] = useState<string[]>([]);

  const handleGetDisableNumbers = () => {
    const parseDisableNumbers = () => {
      let buildDisableNumbers: string[] = [];
      disableNumbersArray.map((el) => {
        const arr = el.split(",");
        arr.map((el) => {
          buildDisableNumbers.push(el);
        });
      });
      return buildDisableNumbers;
    };
    setDisableNumbers(parseDisableNumbers);
  };

  const handleCreateNumbers = () => {
    const createNumbers = new Array(endNumber + 1).fill(null);
    const numbers = createNumbers.map((_, index) => index);

    const filterNumbers = numbers.filter((_, index) => {
      const range = index >= startNumber && index <= endNumber && `${index}`;
      return range;
    });

    const parseNumbers = filterNumbers.map((el) => {
      const rules =
        (`${el}`.length == 1 && `00${el}`) ||
        (`${el}`.length == 2 && `0${el}`) ||
        (`${el}`.length == 3 && `${el}`);
      return !rules ? `${el}` : rules;
    });

    setNumbers(parseNumbers);
  };

  const selectedRandomNumber = () => {
    const randomNumber = Math.round(
      Math.random() * (endNumber - startNumber) + startNumber
    );
    return randomNumber;
  };

  const verifyIsAvailableNumber = (value: string) => {
    const checkNumber = (value: string) => {
      const parseValue = numbers ? parseInt(value) : null;
      if (parseValue === null || parseValue >= numbers.length || parseValue < 0)
        return true;

      const findNumber = numbers[parseValue];
      const isDisabled = disableNumbers.includes(findNumber);
      const isSelected = selectedNumbers.includes(findNumber);

      return isDisabled || isSelected;
    };

    let currentValue = value;

    while (checkNumber(currentValue)) {
      currentValue = `${numbers[selectedRandomNumber()]}`;
    }

    return currentValue;
  };
  const handleRemoveSelectedNumber = (value: string) => {
    const remove = selectedNumbers?.filter((el) => el !== value);
    remove && setSelectedNumbers(remove);
  };

  const handleSelectedNumbers = (inputNumber?: string) => {
    const parseInputNumber = parseInt(
      inputNumber ?? numbers[selectedRandomNumber()]
    );
    const firstNumber = numbers[parseInputNumber];
    const secondNumber = numbers[selectedRandomNumber()];
    const verify = verifyIsAvailableNumber(firstNumber);
    const verify2 = verifyIsAvailableNumber(secondNumber);

    if (pack) {
      setSelectedNumbers((prev) => [...prev, verify, verify2]);
    } else {
      if (verify !== verify2) {
        if (selectedNumbers.length === 0) {
          setSelectedNumbers([verify, verify2]);
        } else {
          setSelectedNumbers([...selectedNumbers, verify, verify2]);
        }
      } else {
        if (selectedNumbers.length === 0) {
          setSelectedNumbers([verify]);
        } else {
          setSelectedNumbers([...selectedNumbers, verify]);
        }
      }
    }
  };

  const handleSetMaxSelectedNumbers = (value: number) => {
    setMaxSelectedNumbers(value);
  };

  const handleResetSelectedNumbers = () => {
    setActivePrice(0);
    setSelectedNumbers([]);
  };

  const handleSelectedPack = (value: PackType) => {
    handleResetSelectedNumbers();
    handleSetMaxSelectedNumbers(value.quantity);
    setPack(value);
  };

  const handleSelectedOption = (el?: string) => {
    handleResetSelectedNumbers();
    setPack(null);
    handleSetMaxSelectedNumbers(endNumber);
    handleSelectedNumbers(el ?? undefined);
  };

  useEffect(() => {
    const dividedSelectNumbers = Math.floor(selectedNumbers.length / 2);
    !pack &&
      setGroup({
        price: `${parseInt(pricePerItem) * dividedSelectNumbers}`,
        quantity: dividedSelectNumbers,
        subPrice: "",
      });
  }, [selectedNumbers]);

  useEffect(() => {
    if (pack) {
      new Array(pack.quantity).fill(1).forEach((_, index) => {
        handleSelectedNumbers(numbers[selectedRandomNumber()]);
      });
    }
  }, [pack]);
  useEffect(() => {
    handleCreateNumbers();
    handleGetDisableNumbers();
  }, []);

  useEffect(() => {
    pack ? setDetails({ ...pack, quantity: 1 }) : setDetails(group);
  }, [pack, group]);

  return {
    maxSelectedNumbers,
    selectedNumbers,
    handleSelectedNumbers,
    numbers,
    disabledNumbers: disableNumbers,
    handleSetMaxSelectedNumbers,
    handleResetSelectedNumbers,
    activePrice,
    setActivePrice,
    handleSelectedPack,
    setPack,
    selectedRandomNumber,
    handleRemoveSelectedNumber,
    handleSelectedOption,
    pack,
    details,
    group,
  };
};

export default useSelectPicker;
