import React from "react";
import logo from '../assets/logo.png'
import load from '../assets/win.gif'

const Loading = ()=>{
    return (
        <div className="w-screen h-screen bg-black flex flex-col gap-14 items-center justify-center">
            <img src={logo} alt = 'logo' className="w-20 h-20"></img>
            <img src={load} alt="loading" className="w-8 h-8"></img>
        </div>
    )
}

export default Loading;