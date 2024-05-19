import React, { useContext, useEffect, useState } from 'react'
import { VscSaveAll } from 'react-icons/vsc'
import { TodolistContext } from '../context/Context'
import TopModal from '../components/TopModal'
import CenterModal from '../components/CenterModal'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { IoIosLock } from 'react-icons/io'

function Editor() {
  const { creating, user } = useContext(TodolistContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)
  const [lock, setLock] = useState(false)
  const [important, setImportant] = useState(false)
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!user.token) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false)
      }, 3000)
    }
  }, [error])

  const createNote = async () => {
    if (title.length < 2 && description.length < 2) {
      setError(true)
    }
    const data = {
      title,
      description,
      lock,
      important,
    }
    if (password.length > 0) data.password = password
    try {
      await api.post('/note', data, { headers: { Authorization: user.token } })
    } catch (error) {
      setError(true)
      console.log(error, error.message)
      console.log(error.response.data.message)
    }
  }

  return (
    <div className='bg-[#CDFADB] min-h-[100vh] max-h-[100vh] flex h-[100%]'>
      {error && (
        <TopModal>
          <div className='bg-[#FF8080] p-5 rounded'>
            <p className='text-gray-800 font-bold text-xl max-w-[200px'>
              Please put at least 2 characters in title and description
            </p>
          </div>
        </TopModal>
      )}

      {lock && (
        <CenterModal>
          <form className='bg-[#CDFADB] p-5 rounded flex flex-col gap-3' action="">
            <p>Define password:</p>
            <input className='input-base' type="text" />
            <button className='bg-[#FF8080] rounded'>Lock note</button>
          </form>
        </CenterModal>
      )}

      <nav className='bg-[#CDFADB]'>
        <ul className='min-w-[70px] mt-5 flex flex-col items-center gap-12 text-[#FF8080] font-bold'>
          <li className='cursor-pointer'>
            <VscSaveAll size={40} />
          </li>
          <li className='cursor-pointer'>
            <VscSaveAll size={40} />
          </li>
          <li onClick={() => setLock(true)} className='cursor-pointer'>
            <IoIosLock className='opacity-60 hover:opacity-100' size={40} />
          </li>
          <li onClick={createNote} className='cursor-pointer' title='Save'>
            <VscSaveAll size={40} />
          </li>
        </ul>
      </nav>
      <div className='flex-grow'>
        <div className='pt-4 bg-[#CDFADB]'></div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          className='w-[98%] outline-none bg-[#FFCF96] p-5 text-lg text-gray-800 font-bold placeholder:font-normal placeholder:text-gray-800 placeholder:opacity-80 border-0 rounded'
          placeholder='Title Here'
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='bg-[#FFCF96] w-[98%] border-0 resize-none outline-none p-5 m-0 text-xl text-gray-800 placeholder:font-normal placeholder:text-gray-800 placeholder:opacity-70 overflow-y-scroll mt-5 h-[70vh] rounded scrollbar-thin scrollbar-webkit'
          placeholder='Description Here'
          name=''
          id=''
        ></textarea>
      </div>
    </div>
  )
}

export default Editor
