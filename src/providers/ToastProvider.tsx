'use client'

import { ToastContainer, Slide } from 'react-toastify'

export default function ToastProvider() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Slide}
      className="text-sm font-semibold"
      stacked
    />
  )
}
