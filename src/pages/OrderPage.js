import React, { useEffect, useState } from "react";
import axios from "axios";
import displayCurrency from "../helpers/displayCurrency";
import { GrSearch } from "react-icons/gr";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", // "Sep"
    day: "numeric", // "9"
    year: "numeric", // "2024"
  }).format(date);
};

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/order-list`,
        {
          withCredentials: true,
        }
      );
      setData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const filteredData = data.filter((item) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      item.productDetails?.some((product) =>
        product.productId.productName?.toLowerCase().includes(lowercasedQuery)
      ) ||
      item.paymentDetails?.payment_method_types?.some((method) =>
        method.toLowerCase().includes(lowercasedQuery)
      )
    );
  });

  console.log("filteredData", filteredData);

  return (
    <div className="">
      <div className="p-4 w-full">
        {data.length > 0 && (
          <div className="flex items-center w-full justify-between max-w-sm border border-orange-200 rounded-full focus-within:shadow pl-2 mb-4">
            <input
              type="text"
              placeholder="Search your ordered products..."
              className="w-full outline-none p-2 bg-transparent"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <div className="text-lg min-w-[50px] h-10 bg-orange-400 flex items-center justify-center rounded-r-full text-white">
              <GrSearch />
            </div>
          </div>
        )}
        {filteredData.length === 0 && (
          <p className="text-center font-semibold">No Orders Available</p>
        )}
        {filteredData.map((item, index) => {
          const formattedDate = formatDate(new Date(item.createdAt));
          return (
            <div key={item.userId + index}>
              <p className="first-line:font-bold text-md">{formattedDate}</p>
              <div className="border rounded">
                <div className="flex flex-col lg:flex-row justify-between">
                  <div className="grid gap-2">
                    {Array.isArray(item.productDetails) &&
                    item.productDetails.length > 0 ? (
                      item.productDetails.map((product, index) => (
                        <div
                          key={product.productId._id + index}
                          className="flex gap-3"
                        >
                          <img
                            src={
                              product.productId.productImage &&
                              product.productId.productImage.length > 0
                                ? product.productId.productImage[0]
                                : "No Product Image"
                            }
                            alt="product"
                            className="w-28 h-28 object-scale-down p-2"
                          />
                          <div>
                            <p className="font-medium text-md text-ellipsis line-clamp-1">
                              {product.productId.productName}
                            </p>
                            <div className="flex items-center gap-5 mt-1">
                              <p className="text-green-600">
                                Price:
                                <span className="">
                                  {displayCurrency(product.productId.price)}
                                </span>
                              </p>
                              <p>Quantity: {product.quantity || 0}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No products found for this order.</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                    <div>
                      <div className="text-lg font-bold text-green-600">
                        Payment Details
                      </div>
                      <p className="ml-1">User ID: {item.email}</p>
                      <p className="ml-1">
                        Time: <span className="">{item.timeSlot}</span>
                      </p>
                      <p className="ml-1">Total Guests: {item.guestCount}</p>
                      <p className="ml-1">
                        Payment Method:
                        {item.paymentDetails?.payment_method_types?.join(
                          ", "
                        ) || "N/A"}
                      </p>
                      <p className="ml-1">
                        Payment Option: {item.paymentOption}
                      </p>
                      <p className="ml-1">
                        Remaining Amount:{" "}
                        <span className="">{item.remainingAmount || 0}</span>
                      </p>
                      <p className="ml-1">
                        Payment Status:{" "}
                        {item.paymentDetails?.payment_status || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="font-semibold ml-auto w-fit lg:text-md min-w-[300px] text-green-600">
                  Total Amount:{" "}
                  <span className="">{displayCurrency(item.totalAmount)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderPage;
