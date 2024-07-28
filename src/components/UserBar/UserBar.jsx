import { useState, useEffect, useRef } from 'react';
import UserPanelAvatar from '../UserPanelAvatar/UserPanelAvatar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import Logout from '../Modals/LogOutModal.jsx/LogOutModal';
import { UserSettingsModal } from '../UserSettingsModal/UserSettingsModal';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import css from './UserBar.module.css';
import Modal from '../../shared/components/Modal/Modal';
import Modal2 from './Modal2/Modal2';

export const UserBar = ({ userName }) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

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

  const handleOpenModal2 = () => {
    setIsModalOpen2(true);
    setIsOpenPopover(false);
  };

  const handleCloseModal2 = () => {
    setIsModalOpen2(false);
  };

  return (
    <div className={css.general}>
      <button type="button" className={css.dropdown} onClick={handleToggle} ref={buttonRef}>
        <div className={css.button}>
          <span className={css.userName}>{userName}</span>
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
          <UserBarPopover
            setIsOpenPopover={setIsOpenPopover}
            handleOpenModal={handleOpenModal}
            handleOpenModal2={handleOpenModal2}
          />
        </div>
      )}
      {isModalOpen && (
        <Modal handleCloseModal={handleCloseModal}>
          <Logout handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      {isModalOpen2 && (
        <Modal2 handleCloseModal={handleCloseModal2}>
          <UserSettingsModal handleCloseModal={handleCloseModal2} />
        </Modal2>
      )}
    </div>
  );
};
