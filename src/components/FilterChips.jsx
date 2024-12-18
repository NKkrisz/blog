import React, { useState, useContext } from 'react';
import { CategContext } from '../context/CategContext';

const FilterChips = ({ selectedCategories, setSelectedCategories }) => {
  const { categories } = useContext(CategContext);
  
  console.log(selectedCategories);
  const handleFilter = (event) => {
    const {value, checked} = event.target
    setSelectedCategories(prev => checked ? [...prev, value] :prev.filter(category=>category!=value))
    
  };

  return (
    <div className="filter-chips">
      {categories &&
        categories.map((category, index) => (
          <div key={index} className="filter-chip">
            <input
              type="checkbox"
              id={`filter-${category.name}`}
              name="filter"
              value={category.name}
              checked={selectedCategories.includes(category.name)}
              onChange={handleFilter}
            />
            <label htmlFor={`filter-${category.name}`}>{category.name}</label>
          </div>
        ))}
    </div>
  );
};

export default FilterChips;
