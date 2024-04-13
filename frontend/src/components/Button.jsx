/* eslint-disable react/prop-types */
export const Button =({title,onClick})=>{
    return <div>
        <button onClick={onClick} type="button" className="text-white  bg-gray-800 w-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">{title}</button>
        
    </div>
}