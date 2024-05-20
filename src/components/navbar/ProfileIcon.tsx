import { UserContext, UserContextType } from "../../App";
import { useContext } from "react";
import { Link } from "react-router-dom";

function ProfileIcon() {
  const context:UserContextType = useContext<UserContextType>(UserContext);
  return (
    <>
        {content(context)}
    </>
  )
}


function content(context:UserContextType):React.ReactElement{
    if(context.user.id === null){
        return (
            <button className="shadow-sm bg-green-500 text-white shadow-green-500 px-3 py-1 rounded-sm">
                <Link to={"/login"}>
                    Login
                </Link>
            </button>
        )
    }else{
        return(
            <button className=" rounded-full bg-green-500 text-white p-2 w-10 h-10" >
                {context.user.username.substring(0,1)}
            </button>
        )
    }
}

export default ProfileIcon