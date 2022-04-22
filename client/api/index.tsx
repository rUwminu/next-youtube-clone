import axios from 'axios'

const base = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:4000'

const userBase = `${base}/api/users`
const authBase = `${base}/api/auth`
const videosBase = `${base}/api/videos`

export const registerUser = (payload: {
  email: string
  username: string
  password: string
  confirmPassword: string
}) => {
  return axios.post(userBase, payload).then((res) => res.data)
}

export const loginUser = (payload: { email: string; password: string }) => {
  return axios
    .post(authBase, payload, { withCredentials: true })
    .then((res) => res.data)
}

export const getMe = () => {
  return axios
    .get(userBase, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err)
      return null
    })
}
