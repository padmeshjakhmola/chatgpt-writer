import { useState } from "react"

import icon from "../../assets/icon.png"
import { Modal } from "../components/Modal"

export const CountButton = ({ onInsertText }) => {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <button onClick={() => setModalOpen(true)}>
        <img src={icon} alt="aiicon" className="w-10 h-10 object-cover" />
      </button>
      {isModalOpen && (
        <Modal
          onClose={() => setModalOpen(false)}
          onInsertText={onInsertText}
        />
      )}
    </>
  )
}
