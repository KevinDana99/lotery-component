import { useEffect, useState } from "react";
import { PackType } from "./types";
import { parse } from "path";

const useSelectPicker = (
  startNumber: number,
  endNumber: number,
  disableNumbers: string[]
) => {
  const [activePrice, setActivePrice] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [numbers, setNumbers] = useState<string[]>([]);
  const [maxSelectedNumbers, setMaxSelectedNumbers] = useState(endNumber);
  let selected: string[] = [];
  const [pack, setPack] = useState<PackType | null>(null);
  const [details, setDetails] = useState<PackType | null>(null);
  const pricePerItem = 30000;
  const [group, setGroup] = useState<PackType | null>(null);
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
      const parseValue = numbers && parseInt(value);
      const findNumber = numbers?.filter((el, index) => index === parseValue);
      const verify = findNumber && disableNumbers.includes(findNumber[0]);
      return verify;
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

  const handleSelectedNumbers = (inputNumber: string, flag?: string) => {
    if (numbers) {
      const parseInputNumber = parseInt(inputNumber);
      const firstNumber =
        numbers[inputNumber ? parseInputNumber : selectedRandomNumber()];
      const secondNumber = numbers[selectedRandomNumber()];
      const verifyNumber =
        firstNumber === secondNumber
          ? numbers[selectedRandomNumber()]
          : numbers[selectedRandomNumber()];

      if (
        selectedNumbers.length <=
        (pack ? maxSelectedNumbers * 2 : maxSelectedNumbers * 1)
      ) {
        const verify1 = verifyIsAvailableNumber(firstNumber);
        const verify2 = verifyIsAvailableNumber(verifyNumber);
        selected.push(verify1, verify2);

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
    !pack &&
      setGroup({
        price: `${(pricePerItem / 2) * selectedNumbers.length}`,
        quantity: selectedNumbers.length,
        subPrice: "",
      });
  }, [selectedNumbers]);

  useEffect(() => {
    handleCreateNumbers();
  }, []);

  useEffect(() => {
    pack ? setDetails(pack) : setDetails(group);
  }, [pack, group]);

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
  };
};

export default useSelectPicker;
