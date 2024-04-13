import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Dashboard=()=>{
    const [balance,setBalance]=useState(0);
    const token=localStorage.getItem("token");
    const navigate=useNavigate();

    useEffect(()=>{
      token ? axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
            Authorization:"Bearer "+token
        }
       })
       .then(response=>{
        const roundedOff=(response.data.balance).toFixed(2);
        setBalance(roundedOff);
          
       })
     : navigate("/signin")
    
    },[])

    return  <div>
        <Appbar/>
        <Balance value={balance}/>
        <Users/>
    </div>
}