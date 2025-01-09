import React from 'react';

function Filters({ filter, setFilter, typeId, setTypeId, limit, setLimit, types }) {
  return (
    <div className='filters'>
      <input
        type="text"
        placeholder="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <select
        onChange={(e) => setTypeId(e.target.value)}
        value={typeId}
      >
        <option value="">Tous les types</option>
        {types.map((type) => (
          <option key={type.id} value={type.id}>{type.name}</option>
        ))}
      </select>

      <select
        onChange={(e) => setLimit(Number(e.target.value))}
        value={limit}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

export default Filters;
