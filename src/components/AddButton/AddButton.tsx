import { useState, useEffect, useRef } from 'react'
import './AddButton.css'

interface AddButtonProps {
  onAddFarm: () => void
  onAddSlaughterhouse: () => void
  onAddCSV: () => void
}

function AddButton({ onAddFarm, onAddSlaughterhouse, onAddCSV }: AddButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleOptionClick = (action: () => void) => {
    action()
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="add-button-container">
      {isOpen && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={() => handleOptionClick(onAddFarm)}>
            Add Farm
          </button>
          <button className="dropdown-item" onClick={() => handleOptionClick(onAddSlaughterhouse)}>
            Add Slaughterhouse
          </button>
          <button className="dropdown-item dropdown-item-last" onClick={() => handleOptionClick(onAddCSV)}>
            Add CSV
          </button>
        </div>
      )}
      
      <button 
        className={`fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Add"
      >
        +
      </button>
    </div>
  )
}

export default AddButton
