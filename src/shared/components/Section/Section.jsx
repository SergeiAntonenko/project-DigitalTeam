import s from './Section.module.css';

const Section = ({ children }) => {
  return <section className={s.Section}>{children}</section>;
};
export default Section;
