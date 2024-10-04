import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import displayCurrency from "../helpers/displayCurrency"
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
  });

  const params = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const [zoomImage, setZoomImage] = useState(false);
  const {fetchUserAddToCart} = useContext(Context);

  const navigate = useNavigate();

  //console.log("Product Id", params);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/product-details`,
        {
          productId: params?.id,
        }
      );
      console.log("Received response:", response);
      setData(response?.data?.data);
      setActiveImage(response?.data?.data?.productImage[0]);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  };

  console.log("Product Details", data);

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({ x, y });
    },
    [zoomImageCoordinate]
  );

  const handleZoomImageLeave = () => {
    setZoomImage(false);
    
  }

  const handleAddToCart = async(e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const handleByProduct = async(e,id) => {
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate('/cart')
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className=" min-h[200px] flex flex-col lg:flex-row gap-2">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 relative p-2 shadow-custom-gray">
            <img
              src={activeImage}
              alt="product"
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleZoomImageLeave}
            />  
            {/*Product zoom */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] min-h-[400px] bg-white -right-[510px] top-0 p-1 overflow-hidden">
                <div
                  className="w-full h-full min-w-[500px] min-h-[400px] mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}%  ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-purple-100 rounded animate-pulse"
                      key={"Loading Image"+index}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      key={imgURL}
                      className="h-20 w-20 rounded"
                    >
                      <img
                        src={imgURL}
                        alt="Product"
                        className="object-scale-down w-full h-full mix-blend-multiply p-1 cursor-pointer shadow-custom-gray"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                        onClick={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-purple-100 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-purple-100 animate-pulse w-full"></h2>
            <p className="capitalize text-purple-400 bg-purple-100 min-w-[100px] animate-pulse h-6 lg:h-8  w-full"></p>

            <div className="text-red-600 bg-purple-100 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full">
              <p className="text-red-600 bg-purple-100 w-full"></p>
              <p className="text-purple-400 line-through bg-purple-100 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 lg:h-8  bg-purple-100 rounded animate-pulse w-full"></button>
              <button className="h-6 lg:h-8  bg-purple-100 rounded animate-pulse w-full"></button>
            </div>

            <div className="w-full">
              <p className="text-purple-600 font-medium my-1 h-6 lg:h-8 bg-purple-100 rounded animate-pulse w-full"></p>
              <p className=" bg-purple-100 rounded animate-pulse h-10 lg:h-12  w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 ml-3">
            <p className="text-green-600 bg-green-200 font-medium rounded-full w-fit px-2">
              {data?.brandName}
            </p>
            <p className="text-lg font-bold">{data?.productName}</p>
            <p className="capitalize text-neutral-500">{data?.category}</p>
            <div className="text-yellow-400 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <div className="flex items-center gap-2 font-medium  my-1 lg:text-xl">
              <p>{displayCurrency(data?.price)}</p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="px-3 py-2 bg-green-600 rounded-full text-white text-sm min-w-[120px] hover:bg-green-700"
              onClick={(e) =>handleByProduct(e,data?._id)}>
                Buy
              </button>
              <button className="px-3 py-2 bg-orange-400 rounded-full text-white text-sm min-w-[120px] hover:bg-orange-500"
              onClick={(e) => handleAddToCart(e,data?._id)}>
                Add To Cart
              </button>
            </div>
            <div>
              <p className="font-bold my-1">Description</p>
              <p className=" text-neutral-500">{data?.description}</p>
            </div>
          </div>
        )}
      </div>

      {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
        )
      }
    </div>
  );
};

export default ProductDetails;