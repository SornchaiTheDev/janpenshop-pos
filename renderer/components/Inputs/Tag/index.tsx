import { ChangeEvent, useState } from 'react'
import type { HTMLInputTypeAttribute } from 'react'
import clsx from 'clsx'
import { IoIosClose } from 'react-icons/io'
import { BsPlus } from 'react-icons/bs'
import Badge from './Badge'

interface Props {
  name?: string
  value: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  onChange: (value: string) => void
  onFocus?: () => void
  className?: string
}

function TagInput({
  name,
  placeholder,
  onChange,
  type = 'text',
  onFocus = null,
  className,
}: Props) {
  const usedTag = Array.from({ length: 10 }, (_, i) => `tag-${i + 1}`)
  const [tags, setTags] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const onBlur = () => {
    if (value.length === 0) {
      setIsAddClicked(false)
    }
  }

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value.length > 0) {
      addTag(value)
      setValue('')
      setIsAddClicked(false)
    }
  }
  
  const addTag = (tag: string) => {
    if (tags.includes(tag)) return
    
    setTags([...tags, tag])
  }

  return (
    <div className={className ? className : null}>
      <label className="block text-neutral-700">{placeholder}</label>
      <div className="flex flex-wrap items-center gap-2 pb-2 mt-2">
        {usedTag.map((tag) => (
          <Badge
            key={tag}
            canRemove={false}
            onClick={() => addTag(tag)}
            tag={tag}
          />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center p-1 rounded-lg bg-lime-200 text-lime-800"
          >
            <p>{tag}</p>
            <button onClick={() => onRemoveTag(tag)}>
              <IoIosClose className="mt-1" />
            </button>
          </span>
        ))}
        {isAddClicked ? (
          <form onSubmit={onSubmit}>
            <input
              autoFocus
              onFocus={onFocus}
              onBlur={onBlur}
              name={name}
              type={type}
              value={value}
              onChange={onInputChange}
              className={clsx(
                'p-2 border rounded-md outline-none placeholder:py-2 focus:ring-2 ring-offset-1 ring-zinc-400'
              )}
            />
          </form>
        ) : (
          <button
            onClick={() => setIsAddClicked(true)}
            className={clsx(
              'p-1 rounded-sm flex justify-center items-center bg-lime-300 hover:bg-lime-400'
            )}
          >
            <BsPlus size="1.25rem" />
          </button>
        )}
      </div>
    </div>
  )
}

export default TagInput
