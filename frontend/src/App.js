import { useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import TopModal from './components/TopModal'
import { FaCheckCircle } from 'react-icons/fa'

function App() {
  const [mode, setMode] = useState('login')
  const [created, setCreated] = useState(false)

  useEffect(() => {
    if (created) {
      setTimeout(() => {
        setCreated(false)
        setMode('login')
      }, [3000])
    }
  }, [created])

  return (
    <div className='flex justify-center w-full'>
      {created && (
        <TopModal timer={true} setCreated={setCreated}>
          <div className='bg-yellow-600 z-50 mt-5 p-2 px-28 rounded-r-lg flex justify-center items-center gap-2 border-2 border-yellow-500 border-l-0 text-black'>
            <p>User Created</p>
            <FaCheckCircle />
          </div>
        </TopModal>
      )}
      <div className='absolute top-1/2 transform -translate-y-1/2 left-0 right-0 max-w-[50%] lg:max-w-[30%] xl:max-w-[20%] m-auto flex flex-col gap-5'>
        <div className='flex justify-between w-[100%]'>
          <p
            className={`flex-grow text-center p-2 border-l-4 border-yellow-500 border-opacity-20 ${
              mode == 'login' && 'border-opacity-80 bg-yellow-500 text-black'
            } cursor-pointer hover:border-opacity-80`}
            onClick={() => setMode('login')}
          >
            Login
          </p>
          <p
            className={`flex-grow text-center p-2 border-r-4 border-yellow-500 border-opacity-20 ${
              mode == 'signup' && 'border-opacity-80 bg-yellow-500 text-black'
            } cursor-pointer hover:border-opacity-80`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </p>
        </div>
        <div className='flex justify-center'>
          {mode == 'login' ? (
            <LoginForm />
          ) : (
            <SignUpForm setCreated={setCreated} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
