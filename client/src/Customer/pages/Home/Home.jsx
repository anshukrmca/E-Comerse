import React from 'react'
import Layout from '../../components/layout/Layout'
import Categories from '../../components/category/Categories'
import Newsletter from '../../components/Newsletter'
import DileveryDel from '../../components/DileveryDel'
import MainCarousel from '../../components/Carousels/MainCarousel'
import HomeProductCarousels from '../../components/Carousels/HomeProductCarousels'

const Home = () => {
  return (
    <>
      <Layout>
        <div className='px-4'>
          <MainCarousel/>
          <Categories/>
          <DileveryDel/>
          <HomeProductCarousels category="mens_kurta"/>
          <HomeProductCarousels category="top"/>
          <HomeProductCarousels category="men_jeans"/>
          <HomeProductCarousels category="shirt"/>
          {/* <Products Categories="Electronics"/> */}
          <Newsletter/>
        </div>
      </Layout>
    </>
  )
}

export default Home