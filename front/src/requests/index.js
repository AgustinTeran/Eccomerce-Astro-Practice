import axios from "axios"

var backUrl = axios.create({
  baseURL: "http://localhost:3001"
})

export default backUrl