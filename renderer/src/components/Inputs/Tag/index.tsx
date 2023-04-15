import { ChangeEvent, useState, useEffect } from 'react'
import type { HTMLInputTypeAttribute } from 'react'
import clsx from 'clsx'
import { IoIosClose } from 'react-icons/io'
import { BsPlus } from 'react-icons/bs'
import Badge from './Badge'
import { trpc } from '@/utils/trpc'

interface Props {
  name?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  onChange: (tags: string[]) => void
  onFocus?: () => void
  className?: string
}

function TagInput({
  name,
  placeholder,
  onChange,
  type = 'text',
  onFocus,
  className,
}: Props) {
  const usedTags = trpc.tags.list.useQuery()
  const [tags, setTags] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [isAddClicked, setIsAddClicked] = useState<boolean>(false)

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value.length <= 0) return
    addTag(value)
  }

  const addTag = (tag: string) => {
    if (tags.includes(tag)) return

    console.log('called')
    setTags([...tags, tag])
    setValue('')
    setIsAddClicked(false)
  }

  useEffect(() => {
    onChange(tags)
  }, [tags])

  return (
    <div className={className}>
      <label className="block text-neutral-700">{placeholder}</label>
      <div className="flex flex-wrap items-center gap-2 pb-2 mt-2">
        {usedTags.data &&
          usedTags.data.map(({ id, name }) => (
            <Badge
              key={id}
              canRemove={false}
              onClick={() => addTag(name)}
              tag={name}
            />
          ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center p-1 rounded-lg bg-sky-200 text-sky-800"
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
              onBlur={() => addTag(value)}
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
              'p-1 rounded-sm flex justify-center items-center bg-sky-300 hover:bg-sky-400'
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
