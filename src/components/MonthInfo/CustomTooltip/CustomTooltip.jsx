import styles from './CustomTooltip.module.css';
import dropletIcon from '../../../images/AdvantagesSection/combined-shape.svg'; // Путь к вашему SVG-иконке

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { water } = payload[0].payload;

    return (
      <svg
        className={styles.customTooltip}
        viewBox="0 0 100 50" // Измените размеры viewBox в соответствии с вашими требованиями
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href={dropletIcon} x="0" y="0" height="100%" width="100%" />
        <text
          x="50%"
          y="41%"
          dominantBaseline="middle"
          textAnchor="middle"
          className={styles.label}
        >
          {`${Math.round(water)} ml`}
        </text>
      </svg>
    );
  }

  return null;
};

export default CustomTooltip;
