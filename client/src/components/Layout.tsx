import React from "react";
import Navbar from "./nav/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <main style={{ minHeight: "calc(100vh - 156px)" }} className="container">
        <Outlet></Outlet>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
