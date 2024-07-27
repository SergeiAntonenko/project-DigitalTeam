import css from './UseBarPopover.module.css';
import { IoSettingsOutline } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';

const UserBarPopover = ({ handleOpenModal }) => {
  return (
    <div className={css.modalWrapp}>
      <div className={css.div}>
        <button type="button" className={css.button}>
          <IoSettingsOutline className={css.icon} />
          <span className={css.settings}>Setting</span>
        </button>
        <button type="button" className={css.button} onClick={handleOpenModal}>
          <FiLogOut className={`${css.logOut} ${css.icon}`} />
          <span className={`${css.logOut} ${css.settings}`}>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default UserBarPopover;

// import css from './UseBarPopover.module.css';
// import { IoSettingsOutline } from 'react-icons/io5';
// import { FiLogOut } from 'react-icons/fi';

// const UserBarPopover = ({ handleOpenModal, handleOpenSettingsModal }) => {
//   return (
//     <div className={css.modalWrapp}>
//       <div className={css.div}>
//         <button type="button" className={css.button} onClick={handleOpenSettingsModal}>
//           <IoSettingsOutline className={css.icon} />
//           <span className={css.settings}>Setting</span>
//         </button>
//         <button type="button" className={css.button} onClick={handleOpenModal}>
//           <FiLogOut className={`${css.logOut} ${css.icon}`} />
//           <span className={`${css.logOut} ${css.settings}`}>Log out</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserBarPopover;