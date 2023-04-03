import { useState, useEffect } from 'react'
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi'
import clsx from 'clsx'
import Input from '../Inputs/Simple'

interface Props {
  canPrevPage: boolean
  canNextPage: boolean
  currentPage: number
  pageSize: number
  nextPage: () => void
  prevPage: () => void
  gotoPage: (updater: number | ((pageIndex: number) => number)) => void
}
function Pagination({
  canNextPage,
  canPrevPage,
  nextPage,
  prevPage,
  currentPage,
  pageSize,
  gotoPage,
}: Props) {
  const [page, setPage] = useState(currentPage.toString())
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    setPage(currentPage.toString())
  }, [currentPage])

  const setGoToPage = () => {
    const number = Number(page)
    if (number > 0 && number <= pageSize) {
      gotoPage(number - 1)
    }
    setIsFocus(false)
  }
  return (
    <div className="flex items-center gap-2 p-1 text-sm rounded-lg">
      <button
        onClick={prevPage}
        className={clsx(
          'p-2 rounded-full ',
          canPrevPage
            ? 'text-sky-500 hover:bg-sky-50'
            : 'text-sky-200 cursor-not-allowed'
        )}
      >
        <BiChevronsLeft size="1.15rem" />
      </button>
      <Input
        onFocus={() => setIsFocus(true)}
        onBlur={setGoToPage}
        value={isFocus ? page : `${parseInt(page) + 1} จาก ${pageSize}`}
        onChange={(value) => setPage(value)}
        type="text"
        className="text-center"
      />
      <button
        onClick={nextPage}
        className={clsx(
          'p-2 rounded-full',
          canNextPage
            ? 'text-sky-500 hover:bg-sky-50'
            : 'text-sky-200 cursor-not-allowed'
        )}
      >
        <BiChevronsRight size="1.15rem" />
      </button>
    </div>
  )
}

export default Pagination
