import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function CategDropdown({categories, setSelectedCategory, selectedCategory}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="d-flex p-5">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>{selectedCategory ? selectedCategory : "Category"}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          {categories && categories.map(category=><DropdownItem key={category.name} onClick={()=>setSelectedCategory(category.name)}>{category.name}</DropdownItem>)}
          </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default CategDropdown;