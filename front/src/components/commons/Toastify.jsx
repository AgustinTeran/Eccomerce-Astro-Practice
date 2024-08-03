import { useEffect } from "react"
import {ToastContainer,notify} from "../../config/notify"

export default function Toastify({error,type}) {
  useEffect(() => {
    if (error) {      
      notify(error.message,type)
    }
  }, [error])
  return (  
    <ToastContainer/>
  )
}