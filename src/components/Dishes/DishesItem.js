import React from 'react';
import { getImage } from '../../api/orders';
import noDishImg from '../../img/no-dish.jpg';
import DishesItemDescription from './DishesItemDescription';

const DishesItem = ({
  title,
  description,
  url,
  photo,
  price,
  deliveryFee,
  merchantRating,
  isAvaliable,
  minimumOrderValue,
  deliveryTime,
}) => {
  return (
    <div className='col' style={{ marginBottom: '.5rem' }}>
      <div className='card'>
        <div className='row no-gutters'>
          <div
            className='col-md-4'
            style={{
              backgroundImage: `url(${photo ? getImage(photo) : noDishImg})`,
              backgroundPosition: 'center',
              backgroundSize: 'auto 100%',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div className='col-md-8'>
            <div className='card-body'>
              <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: 'black' }}
              >
                <h5 className='card-title'>{title}</h5>
              </a>
              {description && (
                <DishesItemDescription description={description} />
              )}
              <p className='card-text'>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M5.483.314l1.128 2.39a.54.54 0 0 0 .405.308l2.522.383c.442.067.618.635.299.96l-1.825 1.86a.58.58 0 0 0-.155.499l.43 2.626c.076.46-.386.811-.78.594L5.25 8.694a.518.518 0 0 0-.502 0l-2.255 1.24c-.395.217-.857-.134-.782-.594l.431-2.626a.58.58 0 0 0-.155-.499L.163 4.355c-.32-.326-.143-.893.299-.96l2.522-.383a.54.54 0 0 0 .405-.308L4.517.314a.528.528 0 0 1 .966 0z'></path>
                </svg>{' '}
                {merchantRating.toFixed(1)} -{' '}
                <span
                  className='card-text'
                  style={{ color: isAvaliable ? 'green' : 'red' }}
                >
                  {isAvaliable ? 'Disponível' : 'Indisponível'}
                </span>{' '}
                {deliveryTime === typeof Number
                  ? `- Entrega em ${deliveryTime} minutos`
                  : null}
              </p>
              <p className='card-text'>
                R$ {price.toFixed(2)} + Entrega: R${deliveryFee.toFixed(2)} ={' '}
                <span className='card-text' style={{ color: 'green' }}>
                  R$ {(price + deliveryFee).toFixed(2)}
                </span>
              </p>
              {minimumOrderValue && (
                <p className='card-text'>
                  Pedido Mínimo: R${minimumOrderValue.toFixed(2)}
                </p>
              )}
              <a
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary'
              >
                Acessar Prato
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishesItem;
