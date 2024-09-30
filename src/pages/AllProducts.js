import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import axios from "axios";
import { toast } from "react-toastify";
import AdminProductCart from "../components/AdminProductCart";

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async() =>{
    try{
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/get-product`)
      console.log('API response:', response.data);
      setAllProduct(response?.data.data|| "")

    }catch(error){
      console.log(error);
      toast.error("Couldn't fetch product data");
    }
  }

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div >
      <div className="px-4 py-2 flex justify-between items-center">
        <h1 className="font-bold text-lg ">All Products</h1>
        <button className="px-4 py-2 bg-orange-400 rounded-full text-white text-md" onClick={() => setOpenUploadProduct(true)}>
          Upload Product
        </button>
      </div>

      {/*all products list component goes here*/}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {
          allProduct.map((product, index) => {
            return(
              <AdminProductCart data = {product} key={index + "allProduct"} fetchData = {fetchAllProduct}/>
            )
          })
        }
      </div>

      {/*upload product component*/}
      {
        openUploadProduct && (
          <UploadProduct onClose = {()=> setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }
    </div>
  );
};

export default AllProducts;
