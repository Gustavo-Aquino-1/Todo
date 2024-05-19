import React, { useContext, useState } from 'react'
import api from '../api'
import { TodolistContext } from '../context/Context'
import { useNavigate } from 'react-router-dom'
import { GoAlertFill } from 'react-icons/go'

function LoginForm() {
  const { setUser } = useContext(TodolistContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/user/login', {
        email,
        password,
      })
      setUser(data)
      navigate('/notes')
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-full'>
      <label className='flex flex-col gap-2' htmlFor=''>
        <p>Email</p>
        <input
          className='input-base w-full'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className='flex flex-col gap-2' htmlFor=''>
        <p>Password</p>
        <input
          className='input-base w-full'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
        />
      </label>

      <button
        className='bg-yellow-500 px-10 p-1 text-black rounded mt-5 font-semibold self-center hover:bg-black border-2 hover:border-2 border-yellow-500 hover:text-yellow-500'
        type='submit'
      >
        Login
      </button>

      {error && (
        <p className='capitalize text-red-400 flex gap-2 items-center'>
          <span>
            <GoAlertFill />
          </span>
          {String(error).split(',')[0]}
        </p>
      )}
    </form>
  )
}

export default LoginForm
