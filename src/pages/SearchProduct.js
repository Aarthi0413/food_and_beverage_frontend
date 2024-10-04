import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VerticalCart from "../components/VerticalCart";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("query", query.search);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/search${query.search}`
      );
      console.log("response", response.data);
      setData(response.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="container mx-auto p-4 ">
      {loading && <p className="text-center text-lg ">Loading...</p>}

      <p className="text-lg font-bold my-3">Search Results: {data.length}</p>
      {data.length === 0 && !loading && (
        <p className="text-center text-lg ">No products found.</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCart loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
