import React from 'react'
import './NewsLetter.css'

export const NewsLetter = () => {
  return (
    <div className='newsletter'>
       <h1>Ganhe Ofertas Exclusivas Em Seu Email</h1>
       <p>Se inscreva para receber notificações e ficar atualizado</p>
       <div>
        <input type="email" placeholder='Seu email' />
        <button>Cadastre</button>
    </div> 
    </div>
  )
  
}
export default NewsLetter