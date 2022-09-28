import React from 'react'

function Logo({width}) {
    const logoStyle = {
        width: `${width}px`
    }
    return (
        <img src='https://renesans.uz/wp-content/uploads/2020/10/cropped-logo-new.png' alt='logo' style={logoStyle}/>
    )
}

export default Logo