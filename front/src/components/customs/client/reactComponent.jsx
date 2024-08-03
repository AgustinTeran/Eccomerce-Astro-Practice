import { useState } from "react";

export default function ReactComponent(){
  var [contador,setContador] = useState(0)
  return (
    <div className="my-4">
      <button className="p-4 btn btn-secondary" onClick={() => {setContador(contador + 1)}}>Add 1</button>
      <span>Contador: {contador}</span>
    </div>
  )
}