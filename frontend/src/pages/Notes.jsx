import React, { useContext, useEffect, useState } from 'react'
import { TodolistContext } from '../context/Context'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { IoMdAlert } from 'react-icons/io'
import { IoIosLock } from 'react-icons/io'

function Notes() {
  const { user, setCreating } = useContext(TodolistContext)
  const [notes, setNotes] = useState([])
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!user) navigate('/')
    const getNotes = async () => {
      const { data } = await api.get('/note', {
        headers: { Authorization: user.token },
      })
      setNotes([...data].sort((a, b) => (a.important ? -1 : 1))) // ,[...data,...notes] for be right
    }
    getNotes()
  }, [])

  return (
    <div className='w-full bg-[#FFCF96] h-[100%] absolute top-0 min-h-[100vh] h-full p-0 m-0'>
      <div className='bg-img' />
      <div className='w-[50%] m-auto flex justify-between gap-10 mt-10'>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='input-base flex-grow bg-[#F6FDC3] border-2 border-[#F6FDC3] placeholder:text-gray-600 placeholder:opacity-80 px-5 py-5 text-lg text-gray-700'
          placeholder='Search for a note'
          type='text'
        />
        <button
          onClick={() => {
            navigate('/notes/editor')
            setCreating(true)
          }}
          className='bg-[#FF8080] text-[#F6FDC3] px-5 rounded font-bold hover:bg-[#F6FDC3] hover:text-[#FF8080] text-lg'
        >
          Create Note
        </button>
      </div>
      <div className='w-[80%] m-auto flex pt-8 mt-10 rounded-lg justify-center items-center  text-black gap-5 flex-wrap'>
        {notes
          .filter((e) =>
            e.title.toUpperCase().includes(query.trim().toUpperCase()),
          )
          .map((e, index) => (
            <div
              key={e.id}
              className={`font-semibold border-2 border-[#CDFADB] bg-[#CDFADB] min-w-[350px] max-w-[350px] text-white rounded-lg p-2`}
            >
              <div className='flex justify-between items-center'>
                <p className='text-lg px-2 py-1 capitalize text-center montserrat text-[#FF8080]'>
                  {e.title}
                </p>
                <div className='flex gap-2'>
                  {e.important && (
                    <IoMdAlert className='text-[#FF8080]' size={20} />
                  )}
                  {e.lock && <IoIosLock className='text-[#FF8080]' size={20} />}
                </div>
              </div>
              <p className=' px-2 pt-2 roboto-regular w-full flex justify-end montserrat text-[#FF8080]'>
                {e.createdAt.split('T')[0].split('-').reverse().join('/')}{' '}
              </p>
              {/*             <div className='relative'>
              <p className={`px-2 py-1 ${e.lock && 'blur-md '} roboto-regular min-h-[200px] max-h-[200px] overflow-hidden`}>
                {e?.description}. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Laborum ex quas consectetur vel modi iusto!
                Alias quod fuga amet tempora commodi nobis veritatis dolore
                consectetur repellendus, ex vitae vero esse.
              </p>
              {e.lock && (
                <div className='absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-center m-auto flex-col items-center gap-2'>
                  <IoIosLock className='text-yellow-600' size={50} />
                  <p className='text-yellow-600 roboto-bold'>Locked Note</p>
                </div>
              )}
            </div>
 */}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Notes
