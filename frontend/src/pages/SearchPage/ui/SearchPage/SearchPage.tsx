import type { FC } from 'react'

import { clsx } from 'clsx'
import { memo, useState } from 'react'

import { BackButton } from '@/shared/ui/BackButton'
import { Input } from '@/shared/ui/input'

import cls from './SearchPage.module.scss'

interface SearchPageProps {
  className?: string
}

export const SearchPage: FC<SearchPageProps> = memo(
  (props: SearchPageProps) => {
    const { className } = props
    const [result, setResult] = useState([])

    return (
      <div className={clsx(cls.searchPage, className)}>
        <BackButton />
        <div className="w-1/4 m-auto mt-20">
          <h3 className="mb-1">Search</h3>
          <Input className="mb-6" placeholder="Enter query" />
        </div>
        <div>
          <h4 className="text-center">{ result.length == 0 ? 'No results' : 'Results'}</h4>
        </div>
      </div>
    )
  },
)
