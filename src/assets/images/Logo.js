import React from 'react'

function Logo({width}) {
    const logoStyle = {
        width: `${width}px`
    }
    return (
        <img src='./logoo.png' alt='logo' style={logoStyle}/>
    )
}

export default Logo