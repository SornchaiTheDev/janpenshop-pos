import { ChangeEvent } from 'react'
import type { HTMLInputTypeAttribute } from 'react'
import clsx from 'clsx'

interface Props {
  name?: string
  value: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
  className?: string
  disabled?: boolean
  autofocus?: boolean
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
  disabled = false,
  autofocus,
}: Props) {
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }
  return (
    <div className={className ? className : undefined}>
      <label className="text-neutral-700">{placeholder}</label>
      <input
        autoFocus={autofocus}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        name={name}
        type={type}
        value={value}
        onChange={onInputChange}
        className={clsx(
          'w-full p-2 mt-2 border rounded-md outline-none bg-white placeholder:py-2 focus:ring-2 ring-offset-1 ring-zinc-400',
          disabled && 'text-neutral-400 bg-neutral-1 cursor-not-allowed'
        )}
      />
    </div>
  )
}

export default Input
