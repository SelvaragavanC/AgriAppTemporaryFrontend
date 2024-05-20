import {  useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import ProfileIcon from "./ProfileIcon";
import { Link } from "react-router-dom";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const pages = [
    {
      id: 1,
      text: "Products",
    },
    {
      id: 2,
      text: "Services",
    },
  ];

  useEffect(()=>{
    document.addEventListener("click",(e)=>{
      if(helpToggle(e)) setToggle(false);
    })
  })

  return (
    <>
      <div
        className=" w-full fixed  bg-white  grid grid-cols-3 gap-2 sm:h-14 items-center p-2 capitalize h-20 z-20 ">
      <div className="h1 block text-2xl font-extrabold  font-sans ">AgriApp</div>

      {/* ------------------------NavItems--------------------- */}
      <div
        className={`justify-self-center flex justify-center items-center gap-2 sm:gap-5 flex-col sm:flex-row absolute sm:static ${
          toggle ? "right-4" : "-right-32"
        } top-20 sm:top-16 bg-white p-5 sm:p-0 transition-all duration-300 fixed`}
      >
        {pages.map((e) => (
          <div key={e.id} className="sm:border-0 border-t-2 hover:cursor ">
            <Link to={`/${e.text.toLowerCase()}`}>{e.text}</Link>
          </div>
        ))}
      </div>

        
        
      <div
        className=" col-start-3 flex justify-end p-1 gap-5 items-center  "
        
      >
        <ProfileIcon/>
        <FaBars size={25}  onClick={() => setToggle((prev) => !prev)} className="sm:hidden" id="toggleBtn" />
      </div>
      </div>
      <div className="h-20 sm:h-16"></div>
    </>

  );
}



function helpToggle(e:MouseEvent){
  const btn = document.getElementById("toggleBtn");
  if(e.target == btn){
    // console.log("btn clicked");
    return false;
  }else{
    // console.log("btn not clicked")
    return true;
  }
}

export default Navbar;
