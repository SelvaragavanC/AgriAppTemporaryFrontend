import axios from "axios";

const API_URL = import.meta.env.VITE_URL;

export async function login(email:string,password:string):Promise<any>{
    try{
        const res = await axios.post(`${API_URL}/login`,{email:email,password:password});
        console.log(res.data);
        return res.data;
    }catch(e){
        return false;
    }
}