import React from 'react';

const SearchBar = ({
  search,
  loading,
  pageSize,
  handleChange,
  handleSubmit,
}) => {
  const button = loading ? (
    <button className='btn btn-primary' type='button' disabled>
      <span
        className='spinner-border spinner-border-sm'
        role='status'
        aria-hidden='true'
      ></span>{' '}
      Carregando Pratos - Pagina {pageSize + 1}
    </button>
  ) : (
    <button className='btn btn-primary' type='submit'>
      Buscar
    </button>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='input-group'>
          <input
            type='text'
            name='search'
            className='form-control'
            placeholder='Nome do Prato...'
            value={search}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <div className='input-group-append'>{button}</div>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
