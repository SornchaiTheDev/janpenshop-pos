import React from 'react'
import { IoIosClose } from 'react-icons/io'

interface Props {
  tag: string
  onRemoveTag?: (tag: string) => void
  canRemove?: boolean
  onClick?: (tag: string) => void
}

function Badge({ canRemove, onRemoveTag, tag, onClick }: Props) {
  if (!canRemove)
    return (
      <button
        onClick={() => (onClick ? onClick(tag) : null)}
        key={tag}
        className="inline-flex items-center px-1 rounded-lg bg-sky-200 text-sky-800 hover:bg-sky-300"
      >
        <p>{tag}</p>
      </button>
    )
  return (
    <span
      key={tag}
      className="inline-flex items-center px-1 rounded-lg bg-sky-200 text-sky-800"
    >
      <p>{tag}</p>

      <button onClick={() => onRemoveTag(tag)}>
        <IoIosClose className="mt-1" />
      </button>
    </span>
  )
}

export default Badge
