const fetchCategoryWiseProduct = async (category) =>{
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/category-product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({category}),
    });
    const data = await response.json();
    //console.log("category product", data);
    return data;
}
export default fetchCategoryWiseProduct;