import { useState } from "react"

import downarrow from "../../assets/downarrow.svg"
import generate from "../../assets/generate.svg"

export const Modal = ({ onClose, onInsertText }) => {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState([])
  const [isInsertEnabled, setInsertEnabled] = useState(false)

  const handleGenerate = () => {
    if (inputValue.trim() === "") return

    const userMessage = {
      text: inputValue,
      isUser: true
    }

    const responseMessage = {
      text: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.",
      isUser: false
    }

    setMessages([...messages, userMessage, responseMessage])
    setInputValue("")
    setInsertEnabled(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGenerate()
    }
  }

  const handleInsert = () => {
    const responseText =
      "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
    onInsertText(responseText)
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 shadow-lg rounded-xl w-3/12">
        <div className="mb-4 max-h-60 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-2 px-4 ${
                message.isUser ? "justify-end" : "justify-start"
              }`}>
              <div
                className={`p-2 rounded-lg text-xl px-4 ${
                  message.isUser ? "bg-blue-500 text-white" : "bg-gray-300"
                } max-w-xs`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border p-4 mb-4 w-full text-xl rounded-lg"
          placeholder="Your Prompt"
        />
        <div className="flex justify-end gap-3 items-center mb-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white p-2 rounded-md text-xl px-4">
            Close
          </button>
          <button
            onClick={handleInsert}
            className={`${
              isInsertEnabled
                ? "bg-green-500"
                : "bg-gray-300 cursor-not-allowed"
            } text-white p-2 rounded-md text-xl px-4 flex items-center`}
            disabled={!isInsertEnabled}>
            <img src={downarrow} alt="downarrow" className="w-4 h-4 mr-2" />
            Insert
          </button>
          <button
            onClick={handleGenerate}
            className="bg-blue-500 text-white p-2 px-4 rounded-md mr-2 text-xl flex items-center">
            <img src={generate} alt="generate" className="w-4 h-4 mr-2" />
            Generate
          </button>
        </div>
      </div>
    </div>
  )
}
