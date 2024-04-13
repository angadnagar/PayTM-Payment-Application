/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Button} from './Button'
import {useNavigate} from 'react-router-dom'

export const User=({user})=>{
    const navigate=useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full w-12 h-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col h-full justify-center text-xl">
                   {user.firstName[0]}
               </div>
            </div>
           
           <div className="flex flex-col justify-center h-full">
               <div>
                 {user.firstName} {user.lastName}
               </div>
           </div>

        </div>

        <div className="flex flex-col justify-center h-full">
           <Button onClick={(e)=>{
             navigate("/send?id="+user._id + "&name=" + user.firstName);
           }} title={"Send Money"}/>
        </div>
    </div>
}