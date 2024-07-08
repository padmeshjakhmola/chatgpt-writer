// src/features/CountButton.tsx
import { useReducer, useState } from "react"

import icon from "../../assets/icon.png"
import { Modal } from "../components/Modal"

export const CountButton = () => {
  const [count, increase] = useReducer((c) => c + 1, 0)
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <>
      <button onClick={() => setModalOpen(true)}>
        <img src={icon} alt="aiicon" className="w-10 h-10 object-cover" />
      </button>
      {isModalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </>
  )
}
