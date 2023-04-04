import { ChangeEvent } from 'react'
import type { HTMLInputTypeAttribute } from 'react'
import clsx from 'clsx'

interface Props {
  name?: string
  value: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  onChange: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  className?: string
}

function Input({
  name,
  placeholder,
  value,
  onChange,
  type = 'text',
  onFocus,
  onBlur,
  className,
}: Props) {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }
  return (
    <div className={className ? className : undefined}>
      <label className="text-neutral-700">{placeholder}</label>
      <input
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        type={type}
        value={value}
        onChange={onInputChange}
        className={clsx(
          'w-full p-2 mt-2 border rounded-md outline-none bg-sky-50 placeholder:py-2 focus:ring-2 ring-offset-1 ring-zinc-400'
        )}
      />
    </div>
  )
}

export default Input
