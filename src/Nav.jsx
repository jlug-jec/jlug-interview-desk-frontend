//Temporary Navbar for now
import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className="flex w-full h-[20px] text-xl text-primary justify-around p-4">
            <Link to='/'>Home</Link>
            <Link to='/add'>Add Tasks</Link>
            <Link to='/tasks'>View Tasks</Link>
            <Link to='/book'>BookMarks</Link>
        </div>
    )
}

export default Nav;