import { useState, useEffect, useRef } from 'react';
import UserPanelAvatar from '../UserPanelAvatar/UserPanelAvatar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import Logout from '../Modals/LogOutModal.jsx/LogOutModal';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import css from './UserBar.module.css';
import Modal from '../../shared/components/Modal/Modal';

export const UserBar = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const handleToggle = () => {
    setIsOpenPopover(prevState => !prevState);
  };

  const handleClickOutside = event => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpenPopover(false);
    }
  };

  useEffect(() => {
    if (isOpenPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenPopover]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsOpenPopover(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.general}>
      <button type="button" className={css.dropdown} onClick={handleToggle} ref={buttonRef}>
        <div className={css.button}>
          <span className={css.userName}>Nadia</span>
          <UserPanelAvatar />
          {isOpenPopover ? (
            <IoChevronUp className={css.chevron} />
          ) : (
            <IoChevronDown className={css.chevron} />
          )}
        </div>
      </button>
      {isOpenPopover && (
        <div className={css.modal} ref={popoverRef}>
          <UserBarPopover setIsOpenPopover={setIsOpenPopover} handleOpenModal={handleOpenModal} />
        </div>
      )}
      {isModalOpen && (
        <Modal handleCloseModal={handleCloseModal}>
          <Logout handleCloseModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};
