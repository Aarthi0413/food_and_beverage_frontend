import { Outlet } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCallback, useEffect, useState } from "react";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
    try {
      const dataResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user-details`,
        {
          withCredentials: true,
        }
      );
      console.log(dataResponse.data);

      dispatch(setUserDetails(dataResponse.data));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  });

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/countAddToCartProduct`,
        {
          withCredentials: true,
        }
      );
      console.log("user details cart product", dataResponse.data);
      setCartProductCount(dataResponse?.data?.data?.count);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    /*user details cart product */
    fetchUserAddToCart();
  }, [fetchUserDetails]);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user details
          cartProductCount, // user details cart product count
          fetchUserAddToCart,
        }}
      >
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        {/* <Footer/> */}
      </Context.Provider>
    </>
  );
}

export default App;
