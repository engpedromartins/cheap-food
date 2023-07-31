import { getLinkToDish } from '../api/orders';

export class Dish {
  constructor(
    id,
    name,
    description,
    photo,
    url,
    price,
    deliveryFee,
    merchantRating,
    isAvaliable,
    minimumOrderValue,
    deliveryTime
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.photo = photo;
    this.url = url;
    this.price = price;
    this.deliveryFee = deliveryFee;
    this.merchantRating = merchantRating;
    this.isAvaliable = isAvaliable;
    this.minimumOrderValue = minimumOrderValue;
    this.deliveryTime = deliveryTime;
  }
}

export const createDishItem = (dish) => {
  const {
    id,
    name,
    description,
    merchant: {
      deliveryFee: { value: deliveryFee },
      userRating: merchantRating,
      available: isAvaliable,
      minimumOrderValue,
      deliveryTime,
      preparationTime,
    },
  } = dish;

  const url = getLinkToDish(dish.merchant.slug, dish.merchant.id, dish.code);
  const price = dish.minimumPrice || dish.price;

  const photo = dish.resources.find((resource) => {
    return resource.type === 'PHOTO';
  })?.fileName;

  const delivery = deliveryTime + (preparationTime || 0);

  return new Dish(
    id,
    name,
    description,
    photo,
    url,
    price,
    deliveryFee,
    merchantRating,
    isAvaliable,
    minimumOrderValue,
    delivery
  );
};
