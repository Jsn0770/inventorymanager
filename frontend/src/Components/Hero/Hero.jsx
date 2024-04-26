import React from 'react'
import './Hero.css'
// import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_icon from '../Assets/growth.png'


export const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            {/* <h2>APENAS NOVIDADES</h2> */}
            <div>
                <div className="hero-hand-icon">
                    <p>Novas</p>
                    {/* <img src={hand_icon} alt="" /> */}
                </div>
                <p>promoções</p>
                <p>para todos</p>
            </div>
            <div className="hero-latest-btn">
                <div>Parcerias</div>
              <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_icon} alt="" />
        </div>
    </div>
  )
  
}
export default Hero