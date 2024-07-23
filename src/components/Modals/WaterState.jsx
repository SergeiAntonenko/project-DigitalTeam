import { useState } from "react";


const useWaterState = () => {
    const [waterAmount, setWaterAmount] = useState(50);

    const increaseWaterAmount = () => {
        setWaterAmount((prevAmount) => {
            const newAmount = prevAmount + 50;
            return newAmount > 5000 ? 5000 : newAmount;
        });
    };

    const decreaseWaterAmount = () => {
        if (waterAmount >= 50) {
            setWaterAmount((prevAmount) => prevAmount - 50);
        }
    };

    const updateWaterAmount = (newAmount) => {
        setWaterAmount(newAmount > 5000 ? 5000 : newAmount);
    };

    return {
        waterAmount,
        increaseWaterAmount,
        decreaseWaterAmount,
        setWaterAmount: updateWaterAmount,
    };
};

export default useWaterState;


