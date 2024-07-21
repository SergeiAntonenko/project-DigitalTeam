import clsx from 'clsx';
import s from './Section.module.css';

const Section = ({ className, children, ...props }) => {
  return (
    <section className={clsx(s.section, className)} {...props}>
      {children}
    </section>
  );
};

export default Section;
