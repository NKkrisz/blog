import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {  Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem,   UncontrolledDropdown,  DropdownToggle,  DropdownMenu,
  DropdownItem,  NavbarText,} from 'reactstrap';
import { FaBlog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { extractUrlAndId } from '../utility/utils';

export const Header=()=> {
  const [isOpen, setIsOpen] = useState(false);
  const {user, logoutUser}=useContext(UserContext)
  const [avatar, setAvatar] = useState(null)
  useEffect(()=>{
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url)
  },[user])
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar fixed='top' expand="md" className="menu" >
        <NavbarBrand href="/"><FaBlog/></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to='/'>Főoldal</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to='/posts'>Posztok</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="nav-link" to='/create'>Uj Poszt</NavLink>
            </NavItem>

          
          </Nav>
{/* autorizáció*/}
          <Nav navbar>
          { !user ? 
          <>
            <NavItem>
              <NavLink className="nav-link" to='/auth/in'>Belépés</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to='/auth/up'>Regisztráció</NavLink>
            </NavItem>
          </> 
          :
          <>
            <NavItem>
              <NavLink onClick={()=>{logoutUser()}} className="nav-link" to='/'>Kijelentkezés</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {avatar ? <img src={avatar} className='myavatar'/> : <RxAvatar/>}
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem><NavLink className="nav-link" to="/profile">Személyes adatok</NavLink></DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Fiók törlése</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </>
          }
          </Nav>  
        </Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}

