import React, { useState } from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {


  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () =>{
    let responseData;
    await fetch ('http://localhost:4000/login',{
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
      'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if (responseData.success) {
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/")
    }
    else {
      alert(responseData.errors)
    }
    
  }

  const signup = async () =>{
    console.log('Signup Function Executed',formData);
    let responseData;
    await fetch ('http://localhost:4000/signup',{
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
      'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if (responseData.success) {
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/")
    }
    else {
      alert(responseData.errors)
    }
    
  }


  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Cadastre-se" ? <input name='username' value={formData.username} onChange={changeHandler} type="text"  placeholder='Seu nome' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Senha' />
        </div>
        <button onClick={()=>{state==='Login'?login():signup()}}>Continue</button>
        {state === "Cadastre-se"
          ? <p className='loginsignup-login'>Você já tem uma conta? <span onClick={() => { setState('Login') }}>Logue aqui</span></p> : <p className='loginsignup-login'>Criar uma conta? <span onClick={() => { setState('Cadastre-se') }}>Clique aqui</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Para continuar, eu concordo com os termos de uso e politicas de privacidade.</p>
        </div>
      </div>
    </div>
  )

}
export default LoginSignup
