import { useEffect, useRef, useState } from 'react';
import css from './WaterProgressBar.module.css';
import { useTranslation } from 'react-i18next';

const WaterProgressBar = ({ progress }) => {
  const { t } = useTranslation();
  const waterRef = useRef(null);
  const [lapPosition, setLapPosition] = useState(0);

  const calculateLapPosition = (containerWidth, correctProgress, circleWidth) => {
    let newPosition = (correctProgress * (containerWidth - circleWidth)) / 100 + circleWidth / 2;

    if (window.innerWidth > 768) {
      newPosition = (correctProgress * (containerWidth - circleWidth + 20)) / 100 + circleWidth / 2;
    }

    return newPosition;
  };

  const updLapPosition = () => {
    if (waterRef.current) {
      const containerWidth = waterRef.current.offsetWidth;
      const circleWidth = 12;
      let correctProgress = Math.min(100, Math.max(0, progress));
      let newPosition = calculateLapPosition(containerWidth, correctProgress, circleWidth);
      setLapPosition(newPosition);
    }
  };

  useEffect(() => {
    updLapPosition();
  }, [progress]);

  useEffect(() => {
    const handleResize = () => {
      updLapPosition();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [progress]);

  useEffect(() => {
    if (waterRef.current) {
      updLapPosition();
    }
  }, [waterRef.current?.offsetWidth]);

  const roundedProgress = Math.round(progress);
  const shouldShowPercentage =
    (roundedProgress >= 15 && roundedProgress <= 40) ||
    (roundedProgress >= 60 && roundedProgress <= 80);

  return (
    <div className={css.waterProgress}>
      <div className={css.progressInfo}>
        <p className={css.data}>{t('water-progress-bar.today')}</p>

        <div className={css.progressContainer} ref={waterRef}>
          <div
            className={css.progressBar}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          ></div>
          <div className={css.progressLap} style={{ left: `${lapPosition}px` }}></div>
        </div>

        {shouldShowPercentage && (
          <div className={css.progressPercentageMove} style={{ left: `${lapPosition}px` }}>
            {roundedProgress}%
          </div>
        )}

        <ul className={css.progressPercentage}>
          <li>0%</li>
          <li>50%</li>
          <li>100%</li>
        </ul>
      </div>
    </div>
  );
};

export default WaterProgressBar;
