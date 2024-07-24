// import UserPanelAvatar from '../UserPanelAvatar/UserPanelAvatar';
// import UserBarPopover from '../UserBarPopover/UserBarPopover';
// import css from './UserBar.module.css';
// import { IoChevronDown } from 'react-icons/io5';
// import { useState } from 'react';
// import { IoChevronUp } from 'react-icons/io5';

// export const UserBar = () => {
//   const [clicks, setClicks] = useState(false);

//   const handleClick = () => {
//     setClicks(!clicks);
//   };
//   return (
//     <>
//       <div className={css.general}>
//         <button type="button" className={css.dropdown} onClick={handleClick}>
//           <div className={css.button}>
//             <span className={css.userName}> Nadia </span>
//             <UserPanelAvatar />
//             {clicks ? (
//               <IoChevronUp className={css.chevron} />
//             ) : (
//               <IoChevronDown className={css.chevron} />
//             )}
//           </div>
//         </button>
//         <div className={css.modal}>{clicks && <UserBarPopover />}</div>
//       </div>
//     </>
//   );
// };
import { useState, useEffect, useRef } from 'react';
import UserPanelAvatar from '../UserPanelAvatar/UserPanelAvatar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserBar.module.css';
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';

export const UserBar = () => {
  const [clicks, setClicks] = useState(false);
  const popoverRef = useRef(null);

  const handleClick = () => {
    setClicks(prevClicks => !prevClicks);
  };

  const handleClickOutside = event => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setClicks(false);
    }
  };

  useEffect(() => {
    if (clicks) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [clicks]);

  return (
    <div className={css.general}>
      <button ref={popoverRef} type="button" className={css.dropdown} onClick={handleClick}>
        <div className={css.button}>
          <span className={css.userName}>Nadia</span>
          <UserPanelAvatar />
          {clicks ? (
            <IoChevronUp className={css.chevron} />
          ) : (
            <IoChevronDown className={css.chevron} />
          )}
        </div>
      </button>
      {clicks && (
        <div className={css.modal}>
          <UserBarPopover />
        </div>
      )}
    </div>
  );
};
