import { useEffect, useState } from "react";
import { PackType } from "./types";
import { parse } from "path";
import { mock_disable_number_array } from "../mocks/disableNumbers";

//
/*
not react

let disableNumbersArray: typeof mock_disable_number_array = [
  "0,2,4,6",
  "2,3,5,6",
  "3,4,7",
];
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
  let selected: string[] = [];
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

    // Loop para generar un nuevo número si ya está deshabilitado o seleccionado
    while (checkNumber(currentValue)) {
      currentValue = `${numbers[selectedRandomNumber()]}`;
    }

    return currentValue;
  };
  const handleRemoveSelectedNumber = (value: string) => {
    const remove = selectedNumbers?.filter((el) => el !== value);
    remove && setSelectedNumbers(remove);
  };

  const handleSelectedNumbers = (inputNumber: string, flag?: string) => {
    if (numbers) {
      const parseInputNumber = parseInt(inputNumber);
      const firstNumber = numbers[parseInputNumber];
      const secondNumber = numbers[selectedRandomNumber()];

      if (
        selectedNumbers.length <=
        (pack ? maxSelectedNumbers * 2 : maxSelectedNumbers * 1)
      ) {
        const verify1 = verifyIsAvailableNumber(firstNumber);
        const verify2 = verifyIsAvailableNumber(secondNumber);
        verify1 === verify2
          ? selected.push(verify1)
          : selected.push(verify1, verify2);

        if (flag !== "pack") {
          setSelectedNumbers([...selectedNumbers, ...selected]);
        } else {
          setSelectedNumbers([...selected]);
        }
      } else {
        setSelectedNumbers([...selected]);
      }
    } else {
      console.log("numbers not exist");
    }
  };

  const handleSetMaxSelectedNumbers = (value: number) => {
    setMaxSelectedNumbers(value);
  };

  const handleResetSelectedNumbers = () => {
    setSelectedNumbers([]);
    selected = [];
  };

  const handleSelectedPack = (value: PackType) => {
    setPack(value);
    handleSetMaxSelectedNumbers(value.quantity);
    const arr = new Array(value.quantity).fill(null);
    setActivePrice(value.quantity);
    arr.forEach(() =>
      handleSelectedNumbers(`${selectedRandomNumber()}`, "pack")
    );
  };

  const handleSelectedOption = (el: string) => {
    setPack(null);
    handleResetSelectedNumbers();
    handleSetMaxSelectedNumbers(endNumber);
    handleSelectedNumbers(el);
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
    handleCreateNumbers();
    handleGetDisableNumbers();
    console.log({ selectedNumbers });
  }, []);

  useEffect(() => {
    pack ? setDetails({ ...pack, quantity: 1 }) : setDetails(group);
  }, [pack, group]);

  useEffect(() => {
    console.log(details);
  }, [details]);

  return {
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
