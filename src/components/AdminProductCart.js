import React, { useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayCurrency from "../helpers/displayCurrency";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmationDialog from "./ConfirmationDialog";

const AdminProductCart = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/delete-product`,
        { _id: data._id },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchData(); // Refresh the data after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An error occurred";
      toast.error(errorMessage);
    } finally {
      setShowConfirm(false);
    }
  };

  const handleConfirmDelete = () => {
    handleDeleteProduct();
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            alt={data.productName}
            width={130}
            height={130}
            className="mx-auto object-fill h-full"
          />
        </div>

        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        <div>
          <p className="font-semibold">{displayCurrency(data.price)}</p>
          <div className="flex gap-2">
            <div
              className="w-fit p-2 bg-green-200 hover:bg-green-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setEditProduct(true)}
            >
              <MdModeEdit />
            </div>
            <div
              className="w-fit p-2 bg-red-200 hover:bg-red-600 rounded-full hover:text-white cursor-pointer"
              onClick={() => setShowConfirm(true)}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}

      {showConfirm && (
        <ConfirmationDialog
          message="Are you sure you want to delete this product?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default AdminProductCart;
