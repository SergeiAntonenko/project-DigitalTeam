import { useState } from "react";

const useWaterState = () => {
  const [waterAmount, setWaterAmount] = useState(50);

  const increaseWaterAmount = () => {
    setWaterAmount((prevAmount) => prevAmount + 50);
  };

  const decreaseWaterAmount = () => {
    if (waterAmount >= 50) {
      setWaterAmount((prevAmount) => prevAmount - 50);
    }
  };

  const updateWaterAmount = (newAmount) => {
    setWaterAmount(newAmount);
  };

  return {
    waterAmount,
    increaseWaterAmount,
    decreaseWaterAmount,
    setWaterAmount: updateWaterAmount,
  };
};

export default useWaterState;
