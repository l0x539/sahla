import React, { useState } from "react";



const ThemeSwitch = ({handleSwitchTheme, theme}) => {
    return (
        <label id="switch" class="switch" >
            <input type="checkbox" id="slider" defaultChecked={theme==="dark"} onClick={handleSwitchTheme} data-theme={theme} />
            <span class="slider round"></span>
        </label>
    )
}

export default ThemeSwitch;