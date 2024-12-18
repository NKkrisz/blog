import React from 'react'
import { useContext } from 'react'
import { Form, useLocation, useNavigate } from 'react-router-dom'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { UserContext } from '../context/UserContext'
import Toastify from '../components/Toastify'

export const PwReset = () => {
  const {msg, resetPassword} = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    console.log(data.get("email"));
    resetPassword(data.get("email"))    
  }
  return (
    <div className='page'>
     <div style={{backgroundColor:"var(--custom_red)", color:"var(--custom_black)", padding:"1rem"}}>
      <h3>Forgor?</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label > Email  </Label>
          <Input   name="email"    placeholder="email"    type="email"    />
        </FormGroup>
        <Button> Submit  </Button>
      </Form>
      {msg && <Toastify {...msg} />}
     </div>
    </div>
  )
}


