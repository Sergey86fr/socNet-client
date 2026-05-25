import type { ReactNode} from "react";
import { useEffect, useRef } from "react"
import { createPortal } from 'react-dom'
import { Button } from "./button";
import { X } from "lucide-react";


type IModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

const Modal = ({ isOpen, onClose, children, title }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Закрытие по Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => { document.removeEventListener('keydown', handleEsc); }
  }, [isOpen, onClose])

  // Закрытие по клику вне модалки
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Блокируем скролл body
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
      >
        {/* Заголовок */}
        <div className="mb-4 flex items-center justify-between">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {children}
      </div>
    </div>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('modal')!
  )
}

export default Modal