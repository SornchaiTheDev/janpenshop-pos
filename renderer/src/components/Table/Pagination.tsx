import { useState, useEffect, ChangeEvent } from 'react'
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi'
import clsx from 'clsx'
import Input from '../Inputs/Simple'
import { isNumber } from '@/utils'

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
  const [page, setPage] = useState<string>((currentPage + 1).toString())
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    setPage((currentPage + 1).toString())
  }, [currentPage])

  const setGoToPage = () => {
    let _page = page

    if (!isNumber(_page)) {
      _page = '1'
    } else if (Number(_page) > pageSize) {
      _page = pageSize.toString()
    } else if (Number(_page) < 1) {
      _page = '1'
    }

    const number = Number(_page)
    if (number > 0 && number <= pageSize) {
      gotoPage(number - 1)
    }
    setIsFocus(false)
    setPage(_page)
  }

  return (
    <div className="flex items-center gap-2 p-1 text-sm rounded-lg">
      <button
        disabled={!canPrevPage}
        onClick={canPrevPage ? prevPage : undefined}
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
        value={isFocus ? page : `${page} จาก ${pageSize}`}
        onChange={(value) => setPage(value)}
        className="text-center"
      />
      <button
        disabled={!canNextPage}
        onClick={canNextPage ? nextPage : undefined}
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
