import React from 'react'
import { useContext } from 'react'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import Toastify from '../components/Toastify'

export const Auth = () => {
  const {user,signInUser, signUpUser, msg}=useContext(UserContext)
  const navigate = useNavigate()

  const location = useLocation()
  console.log(location.pathname);
  const isSignIn = location.pathname == "/auth/in"
  
  console.log(msg);
  

  const handleSubmit=(event)=>{
    event.preventDefault
    const data=new FormData(event.currentTarget)
    console.log(data.get('email'),data.get('password'),data.get('displayName'));
    if(isSignIn) {
      signInUser(data.get('email'),data.get('password'))
    } else {
      signUpUser(data.get('email'),data.get('password'),data.get('displayName'))
    }
  }

 console.log(user);
  
  return (
    <div className='page'>
     <div style={{backgroundColor:"var(--custom_red)", color:"var(--custom_black)", padding:"1rem"}}>
      <h3> {isSignIn ? "Sign In" : "Sign Up"}</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label > Email  </Label>
          <Input   name="email"    placeholder="email"    type="email"    />
        </FormGroup>
        <FormGroup>
          <Label > Password</Label>
          <Input   name="password"    type="password"  />
        </FormGroup>
        {!isSignIn && 
        <FormGroup>
          <Label > Username</Label>
          <Input   name="displayName"    type="text" />
        </FormGroup>
        }
        <Button> Submit  </Button>
      </Form>
      <a href="#" onClick={()=>navigate("/pwreset")}>Forgor</a>
      {msg && <Toastify {...msg} />}
     </div>
    </div>
  )
}


