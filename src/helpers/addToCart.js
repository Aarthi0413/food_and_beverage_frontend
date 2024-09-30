import {toast} from 'react-toastify'

const addToCart =async (e,id) => {
    e?.stopPropagation();
    e?.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addtocart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: id,
        }),
    })

    const responseData = await response.json()
    //console.log('Response Data:', responseData);
    if (responseData.success) {
        toast.success(responseData.message)
    }
    if (responseData.error) {
        toast.error(responseData.message)
    }
    return responseData;
}
export default addToCart;