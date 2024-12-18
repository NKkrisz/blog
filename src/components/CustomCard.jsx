import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomCard = ({name, photoUrl}) => {
  return (
    <div className="customCard">
      <img alt="Sample" src={photoUrl} />
      <div className="cardOverlay">
        <NavLink to={"/posts?ctg="+name}>
          <h5><b>{name}</b></h5>
        </NavLink>
      </div>
    </div>
  );
};

export default CustomCard;
