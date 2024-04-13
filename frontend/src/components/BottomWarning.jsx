/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"

// import { Link } from "react-router-dom"

export const BottomWarning=({label,buttonText,to})=>{
  return <div className="py-2 text-sm flex justify-center">
     <div>
        {label}
     </div>

     <Link className="pointer underline cursor-pointer pl-1" to={to}>{buttonText}</Link>
  </div>
}