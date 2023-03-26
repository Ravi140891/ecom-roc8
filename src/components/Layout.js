import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div style={{ maxWidth: "100vw" }}>
      <Header />
      <main style={{ minHeight: "85vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
