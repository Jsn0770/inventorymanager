import React from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Cadastre-se</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Seu nome' />
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Senha' />
        </div>
        <button>Continue</button>
        <p className='loginsignup-login'>Você já tem uma conta? <span>Logue aqui</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Para continuar, eu concordo com os termos de uso e politicas de privacidade.</p>
        </div>
      </div>
    </div>
  )
  
}
export default LoginSignup
