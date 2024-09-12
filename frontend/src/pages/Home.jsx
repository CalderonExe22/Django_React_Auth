// eslint-disable-next-line no-unused-vars
import { React, useEffect } from 'react'
import { useState } from 'react'
import { UserInfoAPI, UserLogoutAPI } from '../api/accounts'
export default function Home() {

  const [username, setUserName] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(()=>{
    const checkLoggedInUser = async () =>{
      try{
        const token = localStorage.getItem('accessToken')
        if(token) {
          const config = {
            headers : {
              'Authorization' : `Bearer ${token}`
            }
          }
          const response = await UserInfoAPI(config)
          setIsLoggedIn(true)
          setUserName(response.data.username)
        }else{
          setIsLoggedIn(false)
          setUserName('')
        }
      }catch(error){
        setIsLoggedIn(false)
        setUserName('')
        console.log(error)
      }
    }
    checkLoggedInUser()
  },[])

  const handleLogout = async ()=>{
    try{
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      if(refreshToken && accessToken){
        const config = {
          headers : {
            'Authorization' : `Bearer ${accessToken}`
          }
        }
        await UserLogoutAPI({'refresh':refreshToken},config)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setIsLoggedIn(false)
        setUserName('')
      }
    }catch(error){
      console.log('failed logout',error)
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <>
        <h1>Hola, {username}. Gracias por logearte</h1>
        <button onClick={handleLogout}>Logout</button>
        </>
      ):(
        <h1>Hola, logeate primero</h1>
      )}
    </div>
  )
}
