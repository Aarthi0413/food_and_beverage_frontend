import React, { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCart from "../components/VerticalCart";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListInArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListInArray.forEach(el => {
    urlCategoryListObject[el] = true
  })
  // console.log("urlCategoryListObject",urlCategoryListObject)
  // console.log("urlCategoryInArrayList", urlCategoryListInArray)

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([])
  const [sortBy, setSortBy] = useState("");
  
  //console.log("sortBy", sortBy)
  //console.log(params);
  //{params.categoryName}

  const fetchData = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/filter-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category: filterCategoryList })
    });

    const dataResponse = await response.json();

    setData(dataResponse?.data || []);
    // console.log(dataResponse);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };
  // console.log("select category", selectCategory);

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  useEffect(() =>{
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if(selectCategory[categoryKeyName]){
        return categoryKeyName;
      }
      return null;
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory)
    const urlFormat = arrayOfCategory.map((el, index) =>{
      if((arrayOfCategory.length - 1) === index){
        return `category=${el}`
      }

      return `category=${el}&&`
    })
    // console.log('url format', urlFormat.join(""))
    navigate('/product-category?'+urlFormat.join(""))
  }, [selectCategory])

  const handleOnChangeSortBy = (e) => {
    const {value} = e.target
    setSortBy(value)

    if(value === 'asc'){
      setData(prev => prev.sort((a,b) => a.price - b.price))
    }
    if(value === 'dsc'){
      setData(prev => prev.sort((a,b) => b.price - a.price))
    }
  }

  useEffect(() => {
    
  },[sortBy])

  return (
    <div className="container mx-auto p-4 font-serif">
      {/*desktop view */}

      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/*left view */}
        <div className="p-2 bg-white min-h-[calc(100vh-120px)] overflow-y-scroll">
          {/*Sort by */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">
              Sort By
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === 'asc'} value={"asc"} onChange={handleOnChangeSortBy}/>
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="sortBy" checked={sortBy === 'dsc'} value={"dsc"} onChange={handleOnChangeSortBy}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/*Filter by */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b border-slate-300 pb-1">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((categoryName, index) => {
                return (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      id={categoryName?.value}
                      value={categoryName?.value}
                      checked={selectCategory[categoryName?.value]}
                      onChange={handleSelectCategory}
                      
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.lable}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/*right view product */}
        <div className="px-4">
          {/* {
            params?.categoryName && (
              <CategoryWiseProductDisplay category={params?.categoryName} heading={"Recommended Product"}/>
            )
          } */}
          <p className="text-lg font-bold text-slate-500 my-2">Search Result: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && (
              <VerticalCart data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
