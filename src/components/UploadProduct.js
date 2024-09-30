import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData}) => {
  const [data, setData] = useState({
    productName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
  });

  // const [uploadProductImageInput, setUploadProductImageInput] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    // setUploadProductImageInput(file.name);
    // console.log("file", file)
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });

    // console.log("upload image", uploadImageCloudinary.url)
  };

  const handleDeleteProductImage = async (index) => {
    //console.log("delete product image", index)

    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  //upload product
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    //console.log(data);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/upload-product`,data,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
        fetchData();
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="fixed w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center p-3 bg-slate-200 bg-opacity-50">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[70%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-semibold text-lg">Upload Products</h2>
          <div
            className="w-fit ml-auto text-xl hover:bg-red-600 hover:text-white cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmitProduct}
        >
          <label htmlFor="productName" className="mt-1">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            value={data.productName}
            onChange={handleOnchange}
            className="p-2 bg-purple-100 border rounded"
            required
          />
          <label htmlFor="category" className="mt-1">
            Category
          </label>
          <select
            name="category"
            value={data.category}
            id="category"
            className="p-2 bg-purple-100 border rounded"
            onChange={handleOnchange}
            required
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.value}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-1">
            Product Image
          </label>
          <label htmlFor="uploadImage">
            <div className="p-2 bg-purple-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex flex-col justify-center items-center gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>

          <div>
            {data.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-purple-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 text-white p-1 hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">
                *please upload product image
              </p>
            )}
          </div>

          <lable htmlFor="price" className="mt-1">
            Price
          </lable>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price"
            value={data.price}
            onChange={handleOnchange}
            className="p-2 bg-purple-100 border rounded"
            required
          />

          <lable htmlFor="description" className="mt-1">
            Description
          </lable>
          <textarea
            className="h-28 border bg-purple-100 resize-none p-1"
            rows={3}
            cols={5}
            placeholder="Enter product description"
            name="description"
            value={data.description}
            onChange={handleOnchange}
          ></textarea>

          <button className="px-3 py-2 mt-3 bg-orange-400 text-white mb-10 hover:bg-orange-500">
            Upload Product
          </button>
        </form>
      </div>
      {/*dispay full screen image */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
