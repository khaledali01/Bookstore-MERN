import React from "react";
import Menu from "./Menu";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="my-5">
        <div className="p-5 text-center bg-body-tertiary">
          <div className="container py-5">
            <h1 className="text-body-emphasis">{title}</h1>
            <p className="col-lg-8 mx-auto lead">{description}</p>
          </div>
        </div>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
