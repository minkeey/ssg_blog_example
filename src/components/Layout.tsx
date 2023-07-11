import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header></header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  );
};

export default Layout;
