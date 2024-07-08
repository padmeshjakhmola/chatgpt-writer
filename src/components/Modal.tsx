// src/components/Modal.tsx
import { useState } from "react"

export const Modal = ({ onClose }) => {
  const [inputValue, setInputValue] = useState("")

  const handleGenerate = () => {
    // Handle the generate logic here
    console.log("Generate clicked with input:", inputValue)
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 shadow-lg rounded-lg w-5/12">
        <h2 className="text-xl mb-4">Enter your input</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white p-2 rounded mr-2">
          Generate
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded">
          Close
        </button>
      </div>
    </div>
  )
}
