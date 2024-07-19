import { Suspense } from 'react';

const Layout = ({ children }) => {
  return (
    <div className={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default Layout;
