import React, { useState } from "react";



const ThemeSwitch = ({handleSwitchTheme, theme}) => {
    return (
        <label id="switch" className="switch" >
            <input type="checkbox" id="slider" defaultChecked={theme==="dark"} onClick={handleSwitchTheme} data-theme={theme} />
            <span className="slider round"></span>
        </label>
    )
}

export default ThemeSwitch;