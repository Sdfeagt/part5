/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log("In loginservice");
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }