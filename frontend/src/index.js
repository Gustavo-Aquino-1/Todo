import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Provider from './context/Context'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Notes from './pages/Notes'
import Editor from './pages/Editor'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/notes',
    element: <Notes />,
  },
  {
    path: '/notes/editor',
    element: <Editor />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
