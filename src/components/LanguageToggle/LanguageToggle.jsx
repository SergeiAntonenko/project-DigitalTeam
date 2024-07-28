import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import s from './LanguageToggle.module.css';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const [lang, setLang] = useState(() => {
    return i18n.resolvedLanguage;
  });

  const handleToggle = () => {
    const language = lang === 'en' ? 'ua' : 'en';
    i18n.changeLanguage(language);
    setLang(language);
  };

  const getToggleLabel = () => (lang === 'en' ? 'ua' : 'en').toUpperCase();

  return (
    <button className={s.lng} onClick={handleToggle}>
      {getToggleLabel()}
    </button>
  );
};

export default LanguageToggle;
