import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast'

const Layout = ({ children }) => {
  return (
    <div className={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
      <Suspense fallback={null}>{children}</Suspense>
      <Toaster position="top-center" />
    </div>
  );
};

export default Layout;
