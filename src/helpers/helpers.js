import _ from 'lodash';

export const formatAndSortDishes = (dishes) => {
  let dishArray = _.uniqBy(dishes, (e) => {
    return e.id;
  });

  return _.orderBy(
    dishArray,
    (dish) =>
      (dish.minimumPrice || dish.price) + dish.merchant.deliveryFee.value,
    ['asc']
  );
};

export const cleanMerchantArray = (merchants) => _.uniq(merchants);

export const mergeMerchantInfo = (merchants, dishes) => {
  return dishes.map((dish) => {
    return {
      ...dish,
      merchant: {
        ...dish.merchant,
        ...merchants.find((merchant) => merchant.id === dish.merchant.id),
      },
    };
  });
};
