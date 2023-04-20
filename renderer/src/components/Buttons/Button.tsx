import clsx from 'clsx'

interface Props {
  title: string
  type: 'info' | 'success' | 'warning' | 'error'
  onClick?: () => void
  className?: string
}

function Button({ title, type, onClick, className }: Props) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={clsx(
        'w-full p-2  rounded-md outline-none focus:ring-2 ring-offset-1 ',
        type === 'info' &&
          'text-blue-500 bg-blue-200  ring-blue-400 hover:bg-blue-300 hover:text-blue-700',
        type === 'success' &&
          'text-green-500 bg-green-200  ring-green-400 hover:bg-green-300 hover:text-green-700',
        type === 'warning' &&
          'text-yellow-500 bg-yellow-200  ring-yellow-400 hover:bg-yellow-300 hover:text-yellow-700',
        type === 'error' &&
          'text-red-500 bg-red-200 ring-red-400 hover:bg-red-300 hover:text-red-700',
        className
      )}
    >
      {title}
    </button>
  )
}

export default Button
