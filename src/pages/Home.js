import React from 'react'
import CategoryList from '../components/CategoryList'
//import HorizontalCartProduct from '../components/HorizontalCartProduct'
import VerticalCartProduct from '../components/VerticalCartProduct'

const Home = () => {
  console.log("backend url", process.env.REACT_APP_BACKEND_URL)
  return (
    <div>
      <CategoryList/>
      <VerticalCartProduct category={"mini-tiffin"} heading={"Mini Tiffin"}/>
      <VerticalCartProduct category={"poori-masala"} heading={"Poori Masala"}/>
      <VerticalCartProduct category={"chaat"} heading={"Chaat"}/>
      <VerticalCartProduct category={"beverage"} heading={"Beverage"}/>
    </div>
  )
}

export default Home