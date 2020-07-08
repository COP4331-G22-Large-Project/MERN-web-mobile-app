import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState(
        {
            name:'',
            email:'',
            password:'',
            password2:''
        }
    );
    const{ name, email, password, password2} = formData;
  
    const onChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value});
            
    const onSubmit = async e => {
            e.preventDefault();
            if(password !== password2)
            {
                console.log('Password Not Match')
            }else{
                console.log('SUCCESS');   
            }
        };
    
            
    return <Fragment>
        
        <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i class="fas fa-user"></i> Create Your Account</p>
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
          <input type="email" placeholder="Email Address" name="email" 
          value ={email}
          onChange={e =>onChange(e)} required
          />
          
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
        <div class="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value ={password2}
          onChange={e =>onChange(e)} required
            minLength="6"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="SignUp" />
      </form>
      <p class="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
        
        </Fragment>;



};


export default SignUp