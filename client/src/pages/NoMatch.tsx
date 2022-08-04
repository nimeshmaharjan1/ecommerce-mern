import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Try searching something else?</h1>
      <Link to="/">
        <Button type="primary">Go back</Button>
      </Link>
    </div>
  );
};

export default NoMatch;
