import axios from 'axios';
import React, { useEffect, useState } from 'react'
import displayCurrency from '../helpers/displayCurrency';

const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short", // "Sep"
      day: "numeric", // "9"
      year: "numeric", // "2024"
    }).format(date);
  };

const AllOrder = () => {
    const [data, setData] = useState([]);

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/all-order`, {
          withCredentials: true,
        });
        console.log("order-list", response.data);
        setData(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchOrderDetails();
    }, []);
  
    return (
      <div className="font-serif h-[calc(100vh-190px)] overflow-y-scroll scrollbar-none">
        {!data[0] && <p>No Orders Available</p>}
        <div className="p-4 w-full ">
          {data.map((item, index) => {
            const formattedDate = formatDate(new Date(item.createdAt));
            return (
              <div key={item.userId + index}>
                <p className="text-style first-line:font-bold text-md">
                  {formattedDate}
                </p>

                <div className="border rounded p-2">
                  <div className="flex flex-col lg:flex-row justify-between">
                    <div className="grid gap-2">
                      {item.productDetails.map((product, index) => {
                        return (
                          <div
                            key={product.productId + index}
                            className="flex gap-3"
                          >
                            <img
                              src={product.image[0]}
                              alt="product"
                              className="w-28 h-28 object-scale-down p-2"
                            />
                            <div>
                              <p className="font-medium text-md text-ellipsis line-climp-1">
                                {product.name}
                              </p>
                              <div className="flex items-center gap-5 mt-1">
                                <p className="text-green-600">
                                  Price: {displayCurrency(product.price)}
                                </p>
                                <p>Quantity: {product.quantity}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
  
                    <div className="flex flex-col gap-4 p-2 min-w-[300px]">
                      <div>
                        <div className="text-lg font-bold text-green-600">Payment Details</div>
                        <p className=" ml-1">User ID: {item.email}</p>
                        <p className=" ml-1">Time: <span className="text-style">{item.timeSlot}</span></p>
                        <p className=" ml-1">Total Guests: {item.guestCount}</p>
                        <p className=" ml-1">
                          Payment Method:{" "}
                          {item.paymentDetails.payment_method_types}
                        </p>
                        <p className=" ml-1">
                        Payment Option: {item.paymentOption}
                      </p>
                      <p className=" ml-1">
                        Remaining Amount: <span className="text-style">{item.remainingAmount}</span>
                      </p>
                        <p className=" ml-1">
                          Payment Status: {item.paymentDetails.payment_status}
                        </p>
                      </div>
  
                    </div>
                  </div>
                  <div className="font-semibold ml-auto w-fit lg:text-md min-w-[300px] text-green-600">
                    Total Amount: {displayCurrency(item.totalAmount)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default AllOrder