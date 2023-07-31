import React from 'react';
import { createDishItem } from '../../entities/Dish';
import DishesItem from './DishesItem';

const DishesContainer = ({ dishes }) => {
  return (
    <div className='row row-cols-2 mt-3'>
      {dishes.map((item) => {
        const dish = createDishItem(item);
        return (
          <DishesItem
            key={dish.id}
            title={dish.name}
            description={dish.description}
            photo={dish.photo}
            url={dish.url}
            price={dish.price}
            deliveryFee={dish.deliveryFee}
            merchantRating={dish.merchantRating}
            isAvaliable={dish.isAvaliable}
            minimumOrderValue={dish.minimumOrderValue}
            deliveryTime={dish.deliveryTime}
          />
        );
      })}
    </div>
  );
};

export default DishesContainer;
