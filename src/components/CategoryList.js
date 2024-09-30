import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(10).fill(null);

  const fetchCategoryProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/get-category-product`
      );
      setCategoryProduct(response?.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  return (
    <div className="container mx-auto p-4 font-serif">
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {
            loading ? (
                categoryLoading.map((el,index) =>{
                    return (
                        <div className="h-16 w-16 md:w-20 md:h-29 rounded-full overflow-hidden bg-purple-100 animate-pulse" key={"categoryLoading"+index}>
                        </div>
                    )
                })
                
            ): (
                categoryProduct.map((product, index) => {
                    return (
                      <Link to={"/product-category?category="+product?.category} className="cursor-pointer" key={product?.category+index}>
                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden p-4 bg-white flex items-center justify-center">
                          <img
                            src={product?.productImage[0]}
                            alt={product?.category}
                             className="h-full w-full object-cover rounded-full transition-transform hover:scale-110"
                          />
                        </div>
                        <p className="text-center text-sm md:text-base capitalize">{product?.category}</p>
                      </Link>
                    );
                  })
            )
        
       }
      </div>
    </div>
  );
};

export default CategoryList;
