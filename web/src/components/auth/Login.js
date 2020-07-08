import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
    const [formData, setFormData] = useState(
        {
            name:'',
            password:'',
        }
    );
    const{ name,password} = formData;
  
    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value});
            
    const onSubmit = async e => {
            e.preventDefault();
            
                console.log('SUCCESS');   
            
        };
    
            
    return <Fragment>
        
        <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i class="fas fa-user"></i> Sign Into Your Account</p>
      <form class="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input type="text" 
          placeholder="UserName" 
          name="name" 
          value ={name}
          onChange={e =>onChange(e)}
          required />
        </div>
        
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value ={password}
            onChange={e =>onChange(e)} required
            minLength="6"
          />
        </div>
        
        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
        Don't have an account? <Link to ="/signup">Sign Up</Link>
      </p>
        
        </Fragment>;



};



export default Login