import React, { useState } from 'react'
import api from '../api'
import { GoAlertFill } from 'react-icons/go'

function SignUpForm({ setCreated }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/user', {
        name,
        email,
        password,
      })
      setCreated(true)
    } catch (error) {
      setError('Error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-5 w-full`}>
      <label className='flex flex-col gap-2' htmlFor=''>
        <p>Name</p>
        <input
          className='input-base w-full'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          required
        />
      </label>

      <label className='flex flex-col gap-2' htmlFor=''>
        <p>Email</p>
        <input
          className='input-base'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>

      <label className='flex flex-col gap-2' htmlFor=''>
        <p>Password</p>
        <input
          className='input-base'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          maxLength={50}
        />
      </label>

      <p className='text-sm text-gray-500'>By contuing you're accept our rules see more here <span className='underline cursor-pointer'>Services and Terms.</span></p>

      <button
        className='bg-yellow-500 px-10 p-1 text-black rounded mt-3 font-semibold self-center  hover:bg-black border-2 hover:border-2 border-yellow-500 hover:text-yellow-500'
        type='submit'
      >
        Sign Up
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

export default SignUpForm
