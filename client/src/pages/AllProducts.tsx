import React, { useEffect } from "react";
import { useLocation } from "react-router";

const AllProducts = () => {
  // A custom hook that builds on useLocation to parse
  // the query string for you.
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  const query = useQuery();
  useEffect(() => {
    console.log(query.get("keyword"));
  });
  return <div>AllProducts</div>;
};

export default AllProducts;
