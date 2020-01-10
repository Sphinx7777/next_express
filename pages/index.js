 
import React from 'react'
import Link from 'next/link'
// import fetch from 'isomorphic-unfetch'

const Index = () => {

return (
<ul>
    <li>
      <Link href='/view'>
        <a>view</a>
      </Link>
    </li>
    <li>
      <Link href='/b'>
        <a>b</a>
      </Link>
    </li>
    <li>
      <Link href= '/posts'>
        <a>posts</a>
      </Link>
    </li>
  </ul>
)
}
// Index.getInitialProps = async () => {
//   const res = await fetch('http://localhost:3000/posts/all')
//   const json = await res.json()
//   console.log('getInitialProps', json)
// return { posts: json.data }
// }

export default Index;


