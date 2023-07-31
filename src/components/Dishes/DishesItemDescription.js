import React, { useState } from 'react';

const MAX_CHARACTER_LENGTH = 140;

const DishesItemDescription = (props) => {
  const showLessDesc = props.description.slice(0, MAX_CHARACTER_LENGTH + 1);
  const [description, setDescription] = useState(
    props.description >= MAX_CHARACTER_LENGTH ? showLessDesc : props.description
  );

  const toggleDescriptionSize = () => {
    if (description.length >= MAX_CHARACTER_LENGTH)
      setDescription(props.description);
    else setDescription(showLessDesc);
  };

  return (
    <p className='card-text'>
      {description}
      {props.description.length >= MAX_CHARACTER_LENGTH ? (
        <>
          ...{' '}
          <span
            onClick={toggleDescriptionSize}
            style={{ textDecoration: 'underline', color: 'darkblue' }}
          >
            {description.length >= MAX_CHARACTER_LENGTH
              ? 'Ver Mais'
              : 'Ver Menos'}
          </span>
        </>
      ) : null}
    </p>
  );
};

export default DishesItemDescription;
