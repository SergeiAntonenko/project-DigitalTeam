import { useState, useEffect, useRef } from 'react';
import UserPanelAvatar from '../UserPanelAvatar/UserPanelAvatar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserBar.module.css';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

export const UserBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleClickOutside = event => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={css.general}>
      <button type="button" className={css.dropdown} onClick={handleToggle} ref={buttonRef}>
        <div className={css.button}>
          <span className={css.userName}>Nadia</span>
          <UserPanelAvatar />
          {isOpen ? (
            <IoChevronUp className={css.chevron} />
          ) : (
            <IoChevronDown className={css.chevron} />
          )}
        </div>
      </button>
      {isOpen && (
        <div className={css.modal} ref={popoverRef}>
          <UserBarPopover />
        </div>
      )}
    </div>
  );
};
