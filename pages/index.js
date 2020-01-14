
import React from 'react'
import Link from 'next/link'


const Index = () => {

  return (
    <ul>
      <li>
        <Link href='/others'>
          <a>Другое</a>
        </Link>
      </li>
      <li>
        <Link href='/posts'>
          <a>Блог</a>
        </Link>
      </li>
    </ul>
  )
}

export default Index;


