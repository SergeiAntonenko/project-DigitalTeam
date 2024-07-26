import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import s from './LanguageToggle.module.css';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const [lang, setLang] = useState(() => {
    return i18n.resolvedLanguage;
  });

  const handleToggle = () => {
    setLang(lng => {
      const language = lng === 'en' ? 'ua' : 'en';
      i18n.changeLanguage(language);
      return language;
    });
  };

  return (
    <button className={s.lng} onClick={handleToggle}>
      {lang.toUpperCase()}
    </button>
  );
};

export default LanguageToggle;
