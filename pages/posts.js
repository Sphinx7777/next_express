import React, { Component } from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { Form } from '../src/Components/form'

class Post extends Component {

  state = {
    posts: this.props.posts || []
  };

  static getInitialProps = async (context) => {
    if (context.req) {
      return { posts: Array.from(context.query) }
    } else {
      const res = await fetch('http://localhost:3000/posts/all')
      const json = await res.json()
      console.log(json)
      return { posts: json.data }
    }
  }

  newPost = async (post) => {
    const response = await fetch('http://localhost:3000/posts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(post)
    })
    const json = await response.json()
    this.setState({
      posts: [...this.state.posts, json]
    });
  }

  deletePost = async (id) => {
    const response = await fetch(`http://localhost:3000/posts/del/${id}`, {
      method: 'DELETE'
    })
    this.setState({
      posts: this.state.posts.filter(post => post._id !== id)
    });
  }

  // setNewDescription = (e) => {
  //   this.setState({
  //     newDescription: e.target.value
  //   });
  // }

  // updatePost = async (id) => {
  //   const response = await fetch(`http://localhost:3000//posts/update/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: JSON.stringify(this.state.newDescription)
  //   })
  //   const json = await response.json()
  //   console.log(json)

  // this.setState({
  //   posts: [...this.state.posts, json]
  // });
  // }

  // toogleEditMode = (id) => {
  //   this.setState({
  //     posts: this.state.posts.map(post => post.id)
  //   });
  // }



  render() {
    const posts = this.state.posts;
    return (
      <div>
        <Link href="/">
          <a>back</a>
        </Link>
        {posts.map(post => <div key={post._id}>
          <h1>My blog post: {post.name}</h1>
          <p>{post.description} id :{post._id.toString()}</p>
          <button onClick={() => this.deletePost(post._id)}>delete</button>
        </div>
        )}
        <Form newPost={this.newPost} />
      </div>
    )
  }
}
export default Post;
