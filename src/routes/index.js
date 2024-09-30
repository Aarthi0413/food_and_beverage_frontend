import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentCancel from "../pages/PaymentCancel";
import OrderPage from "../pages/OrderPage";
import AllOrder from "../pages/AllOrder";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"forgot-password",
                element:<ForgotPassword/>
            },
            {
                path:"signup",
                element:<Signup/>
            },
            {
                path:"product-category",
                element:<CategoryProduct/>
            },
            {
                path:"product/:id",
                element:<ProductDetails/>
            },
            {
                path: "cart",
                element: (
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                )
            },
            {
                path:"success",
                element:<PaymentSuccess/>
            },
            {
                path:"cancel",
                element:<PaymentCancel/>
            },
            {
                path: "order",
                element: (
                    <ProtectedRoute>
                        <OrderPage />
                    </ProtectedRoute>
                )
            },
            {   
                path:"search",
                element:<SearchProduct/>
            },
            {
                path: "admin-panel",
                element: (
                    <ProtectedRoute>
                        <AdminPanel />
                    </ProtectedRoute>
                ),
                children:[
                    {
                        path: "all-users",
                        element: (
                            <ProtectedRoute>
                                <AllUsers />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "all-products",
                        element: (
                            <ProtectedRoute>
                                <AllProducts />
                            </ProtectedRoute>
                        )
                    },
                    {
                        path: "all-orders",
                        element: (
                            <ProtectedRoute>
                                <AllOrder />
                            </ProtectedRoute>
                        )
                    }
                ]
            }
        ]
    }
])

export default router;
