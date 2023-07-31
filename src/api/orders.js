import axios from 'axios';

const getDishes = async (
  query = 'pizza',
  page = 0,
  latitude = '-23.5322444',
  longitude = '-46.6850313'
) =>
  axios.get(
    `https://marketplace.ifood.com.br/v2/search/catalog-items?latitude=${latitude}&longitude=${longitude}&channel=IFOOD&term=${query}&size=100&page=${page}`
  );
const getImage = (imageSlug) => {
  return `https://static-images.ifood.com.br/image/upload/t_low/pratos/${imageSlug}`;
};

const getLinkToDish = (slug, merchantId, dishId) => {
  return `https://www.ifood.com.br/delivery/${slug}/${merchantId}?prato=${dishId}`;
};

const getMerchantInformation = async (
  merchantId,
  zipCode = '05018011',
  latitude = '-23.5322444',
  longitude = '-46.6850313'
) =>
  axios.get(
    `https://marketplace.ifood.com.br/v2/merchants/${merchantId}?restaurantId=${merchantId}&latitude=${latitude}&longitude=${longitude}&channel=IFOOD&zip_code=${zipCode}`
  );
export { getDishes, getImage, getLinkToDish, getMerchantInformation };
