import React, { Component } from 'react'
import Link from 'next/link'
import { Form } from '../src/Components/form'
import { postsApi } from '../src/api/api';
import Router from 'next/router'

// <style jsx>{`
// h1,
// a {
//   font-family: 'Arial';
// }

// ul {
//   padding: 0;
// }

// li {
//   list-style: none;
//   margin: 5px 0;
// }

// a {
//   text-decoration: none;
//   color: blue;
// }

// a:hover {
//   opacity: 0.6;
// }
// `}</style>

class Post extends Component {

  state = {
    posts: this.props.posts || []
  };

  static getInitialProps = async (context) => {
    if (context.req) {
      return { posts: context.query }
    } else {
      return { posts: await postsApi.getAllPosts() }
    }
  }

  newPost = async (data) => {
    const response = await postsApi.createNewPost(data.post)
    this.setState({
      posts: [...this.state.posts, response]
    });
  }

  render() {
    const posts = this.state.posts;
    const isAutorisedUser = true
    return (
      <div>
        <Link href="/">
          <a>главная</a>
        </Link>
        {posts.map(post =>
          <div key={post._id} >
            <div onClick={() => Router.push(`/view/${post._id}`)}>
              <h1>{post.title}</h1>
              <p>Автор: {post.autor}</p>
              <p>createdDate: {post.createdDate.toLocaleString()}</p>
            </div>
          </div>
        )}
        {
          isAutorisedUser && <Form newPost={this.newPost} autor='Вася Пупкин' id='' />
        }

      </div>
    )
  }
}
export default Post;
