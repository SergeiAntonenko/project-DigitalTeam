import { useState, useEffect } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return {
    openModal,
    isModalOpen,
    handleCloseModal,
  };
};

export default useModal;