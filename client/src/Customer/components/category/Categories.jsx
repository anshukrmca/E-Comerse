import React from 'react';
import Categorie from './Categorie';
import HeaderTittle from '../HeaderTittle';

const Categories = () => {
  return (
    <section className='' id='category'>
      <HeaderTittle tittle='Our top Categories'/>
      <div className='grid gap-2 md:grid-cols-3 mb-2'>
        <Categorie
          name='mens_kurta'
          image='https://api.lorem.space/image/fashion?w=640&h=480&r=3529'
        />
        <Categorie
          name='top'
          image='https://www.campusshoes.com/cdn/shop/products/FIRST_11G-787_WHT-SIL-B.ORG_720x.jpg?v=1670326183'
        />
        <Categorie
          name='Electronics'
          image='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/s9-case-unselect-gallery-1-202309_GEO_IN_FMT_WHH?wid=752&hei=720&fmt=p-jpg&qlt=80&.v=1693438466860'
        />
        <Categorie
          name='Mobile'
          image='https://m-cdn.phonearena.com/images/article/64576-wide-two_1200/The-Best-Phones-to-buy-in-2023---our-top-10-list.jpg'
        />
        <Categorie
          name='Furniture'
          image='https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71u3F2NZ9gL._AC_UF1000,1000_QL80_DpWeblab_.jpg'
        />
        <Categorie
          name='Others'
          image='https://t3.ftcdn.net/jpg/06/27/79/34/360_F_627793462_UI9lLQsov6A56B1d5f0QSDEPjVqif3rv.jpg'
        />
      </div>
    </section>
  );
};

export default Categories;
