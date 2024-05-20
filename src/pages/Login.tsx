import { ReactNode, useContext, useState } from "react"
import { Link, NavigateFunction, useNavigate } from "react-router-dom"
import { AlertContext,AlertContextType } from "../App";
import { login } from "../utilityFunctions/AuthenticationUtilities";
import { UserContext,UserContextType } from "../App";


function Login() {
    const alertContext:AlertContextType = useContext(AlertContext);
    const userContext:UserContextType = useContext(UserContext);

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate:NavigateFunction = useNavigate();

    //button
    var submitBtn:ReactNode = 
    <button
        className = 
        {
            `
               text-left w-1/4 sm:w-fit  px-2 text-white flex items-center
              bg-green-500
           `
        }
        onClick={()=>{authenticate(email,password)}}
    >
        Submit
    </button>

    //functions
    function perfectButton(email:string,password:string):ReactNode{
        if(validate(email,password)) return submitBtn;
        return <button className="bg-gray-500 w-1/2 p-2 rounded disabled:cursor-not-allowed" disabled> submit </button>
    }

    async function authenticate(email:string,password:string):Promise<boolean>{
        login(email,password);
        alertContext.updateAlert( {duration:2000,backgroundColor:"bg-yellow-500",position:"left-5",text:"please wait..."})
        const res = await login(email,password);
        if(!res){
            alertContext.updateAlert({duration:2000,backgroundColor:"bg-red-500",position:"left-5",text:"Invalid credentials"})
        }else{
            alertContext.updateAlert({duration:2000,backgroundColor:"bg-green-500",position:"left-5",text:"Logged in as "+res.username})
            userContext.updateUser(res);
            navigate("/");
        }
        return true;
    }


  return (
    <div
        className=" w-3/4 md:w-2/4 relative top-20 left-1/2 -translate-x-1/2 p-5 bg-gradient-to-br from-blue-500
         to-blue-100 rounded flex flex-col gap-2 sm:items-center z-10"
    >
        <div
            className="text-center text-xl font-mono"
        >
            Login 
        </div>
        <div className="flex flex-col">
            <div>Email: </div>
            <input
                type="text" 
                id="email" 
                name="email" 
                key={1} 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)}
                className= {`outline-0 w-11/12 border-2 ${validateEmail(email)?"focus:border-green-500":"focus:border-red-500"}   `}
            />
            {email && <span className="text-red-500" >{validateEmail(email)?"":"Invalid email"}</span>}
        </div>

        <div>
            <div>Password: </div>
            <input 
                type="password"
                id="password" 
                name="password" 
                key={2}
                className={`outline-0 w-11/12`}
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
        </div>

        {
            perfectButton(email,password)
        }

        <p>don't have an account? <Link to={"/register"} ><span className=" text-blue-800 underline">register</span></Link></p>
    </div>
  )
}


function validateEmail(email:string):boolean{
    if(email.length<5) return false;
    if(email.match("@")==null) return false;
    return true;
}

function validatePassword(password:string):boolean{
    return password.length!=0;
}

function validate(email:string,password:string){
    return validateEmail(email) && validatePassword(password);
}









export default Login