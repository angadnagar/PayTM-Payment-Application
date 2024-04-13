/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { User } from "./User";
import axios from 'axios'



export const Users=()=>{
    const [users,setUsers]=useState([]);
    const [filter,setFilter]=useState("");

    useEffect(()=>{
       axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter)
          .then(response=>{
            setUsers(response.data.users);
        })
    },[filter])

    // const filteredUsers=users.filter(user=>user._id!="");

    return <div>
        <div className="font-bold mt-4 text-lg">Users</div>

        <div className="my-2">
        <input onChange={e=>setFilter(e.target.value)} type="text" className="w-full border rounded px-2 py-1 border-slate-200" placeholder="Search users..." />
        </div>

        <div>
            {users?.map(user => <User key={user._id} user={user}/>)}
        </div>

    </div>
}