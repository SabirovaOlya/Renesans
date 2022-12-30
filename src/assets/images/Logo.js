import React from 'react'
import logo from './logo.png'

function Logo({width}) {
    const logoStyle = {
        width: `${width}px`
    }
    return (
        <img src={logo} alt='logo' style={logoStyle}/>
    )
}

export default Logo