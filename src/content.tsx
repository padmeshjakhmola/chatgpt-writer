import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useState } from "react"

import { CountButton } from "~features/CountButton"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [showButton, setShowButton] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ bottom: 0, right: 0 })

  const handleInsertText = (text) => {
    const inputBox = document.querySelector(".msg-form__contenteditable")
    if (inputBox) {
      inputBox.focus()
      document.execCommand("selectAll", false, null)
      document.execCommand("insertText", false, text)
    }
  }

  useEffect(() => {
    const checkInputBox = () => {
      const inputBox = document.querySelector(".msg-form__contenteditable")

      if (inputBox) {
        const handleFocus = (event) => {
          setShowButton(true)
          updateButtonPosition(event.target)
          console.log("Input Clicked")
        }
        const handleBlur = (event) => {
          console.log("Input blurred")
        }

        const updateButtonPosition = (target) => {
          const rect = target.getBoundingClientRect()
          setButtonPosition({
            bottom:
              window.innerHeight - rect.top - rect.height + window.scrollY,
            right:
              window.innerWidth - rect.left - rect.width + window.scrollX - 40
          })
        }

        inputBox.addEventListener("focus", handleFocus)
        inputBox.addEventListener("blur", handleBlur)

        const observer = new MutationObserver((mutationsList) => {
          for (const mutation of mutationsList) {
            if (
              mutation.type === "attributes" &&
              mutation.attributeName === "data-artdeco-is-focused"
            ) {
              const isFocused =
                inputBox.getAttribute("data-artdeco-is-focused") === "true"
              setShowButton(true)
              if (isFocused) {
                updateButtonPosition(inputBox)
              }
            }
          }
        })

        observer.observe(inputBox, { attributes: true })

        return () => {
          inputBox.removeEventListener("focus", handleFocus)
          inputBox.removeEventListener("blur", handleBlur)
          observer.disconnect()
        }
      } else {
        setTimeout(checkInputBox, 500) // Retry after 500ms
      }
    }

    checkInputBox()
  }, [])

  return (
    <>
      {showButton && (
        <div
          className="z-1 fixed"
          style={{
            bottom: `${buttonPosition.bottom}px`,
            right: `${buttonPosition.right}px`
          }}>
          <CountButton onInsertText={handleInsertText} />
        </div>
      )}
    </>
  )
}

export default PlasmoOverlay
