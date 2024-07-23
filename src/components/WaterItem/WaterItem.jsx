// import css from './WaterItem.module.css';
// import { IconGlass } from '../../shared/icons/IconGlass';
// import { IconEdit } from '../../shared/icons/IconEdit';
// import { IconTrash } from '../../shared/icons/IconTrash';
// const WaterItem = () => {
//   return (
//     <div className={css.general}>
//       <div className={css.center}>
//         <div className={css.div1}>
//           <IconGlass className={css.div1} />
//         </div>
//         <div className={css.div2}>
//           <p className={css.text_value}>250 ml</p>
//           <p className={css.text_time}>7:00 AM</p>
//         </div>
//         <div className={css.buttonContainer}>
//           <button type="button" className={css.button1}>
//             <IconEdit size={14} />
//           </button>
//           <button type="button" className={css.button2}>
//             <IconTrash size={14} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WaterItem;
import css from './WaterItem.module.css';
import { IconGlass } from '../../shared/icons/IconGlass';
import { IconEdit } from '../../shared/icons/IconEdit';
import { IconTrash } from '../../shared/icons/IconTrash';

const WaterItem = () => {
  return (
    <div className={css.general}>
      <div className={css.center}>
        <div className={css.div1}>
          <IconGlass className={css.div1} />
        </div>
        <div className={css.div2}>
          <p className={css.text_value}>250 ml</p>
          <p className={css.text_time}>7:00 AM</p>
        </div>
        <div className={css.buttonContainer}>
          <button type="button" className={css.button1}>
            <IconEdit className={css.edit} />
          </button>
          <button type="button" className={css.button2}>
            <IconTrash className={css.edit} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaterItem;
