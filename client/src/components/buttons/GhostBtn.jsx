import { Button } from "antd";
import React from "react";

const GoHomeBtn = ({ children }) => {
  return (
    <Button ghost className="go-back-btn">
      {children}
    </Button>
  );
};

export default GoHomeBtn;
