import { useEffect, useRef, useState } from 'react';
import css from './WaterProgressBar.module.css';
import { useTranslation } from 'react-i18next';

const WaterProgressBar = ({ progress }) => {
    const { t } = useTranslation();
    const waterRef = useRef(null);
    const [lapPosition, setLapPosition] = useState(10);

    const updLapPosition = () => {
        if (waterRef.current) {
            const containerWidth = waterRef.current.offsetWidth;
            const circleWidth = 15;

            let correctProgress = Math.min(100, Math.max(0, progress));

            let newPosition = (correctProgress * containerWidth) / 100;

            if (correctProgress >= 0 && correctProgress <= 5) {
                newPosition = 10;
            } else if (correctProgress === 100) {
                newPosition = containerWidth - circleWidth / 2;
            } else {
                newPosition = (correctProgress * (containerWidth - circleWidth)) / 100 + circleWidth / 2;
            }

            if (window.innerWidth > 768) {
                if (correctProgress >= 0 && correctProgress <= 5) {
                    newPosition = 15;
                } else if (correctProgress === 100) {
                    newPosition = containerWidth + 10 - circleWidth / 2;
                } else {
                    newPosition = (correctProgress * (containerWidth + 20 - circleWidth)) / 100 + circleWidth / 2;
                }
            }

            setLapPosition(newPosition);
        }
    };

    useEffect(() => {
        updLapPosition();
    }, [progress]);

    useEffect(() => {
        window.addEventListener('resize', updLapPosition);

        return () => {
            window.removeEventListener('resize', updLapPosition);
        };
    }, []);

    const roundedProgress = Math.round(progress);
    const shouldShowPercentage = (roundedProgress >= 15 && roundedProgress <= 40) || (roundedProgress >= 60 && roundedProgress <= 80);

    return (
        <div className={css.waterProgress}>
            <div className={css.progressInfo}>
                <p className={css.data}>{t('water-progress-bar.today')}</p>

                <div className={css.progressContainer} ref={waterRef}>
                    <div className={css.progressBar} style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}></div>
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