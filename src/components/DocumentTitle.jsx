import { Helmet } from 'react-helmet-async';

export const DocumentTitle = ({ children }) => {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
};
