import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Router, { withRouter } from 'next/router'
import { postsApi } from '../src/api/api';
import { Form } from '../src/Components/form';
import { Button } from '../src/Components/Button';

const View = (props) => {
    const [post, setPost] = useState(props.post)
    const [showForm, setToogleSowForm] = useState(false)
    const isAutor = true

    const toogleShowForm = () => {
        setToogleSowForm(!showForm)
    }


    const deletePost = async (id) => {
        await postsApi.dellPost(id)
        setPost('Пост был удален')
    }

    const updatePost = async (data) => {
        const response = await postsApi.updatePost(data)
        setPost(response)
    }

    return (
        <div>
            <Link href="/">
                <a>Главная</a>
            </Link>
            <Link href='/posts'>
                <a>Посты</a>
            </Link>
            {
                (typeof post === 'object')
                    ?
                    <div>
                        <p>{post.title}</p>
                        <p>{post.autor}</p>
                        <p>{post.description}</p>
                    </div>
                    : <p>{post}</p>
            }
            {
                isAutor && <div>
                    <Button
                        disabled={typeof post !== 'object'}
                        onClick={() => deletePost(post._id)}>
                        Удалить
                    </Button>
                    <Button
                        onClick={toogleShowForm}>
                        {!showForm ? 'Изменить' : 'Отменить'}
                    </Button>
                </div>
            }
            {
                showForm && <Form newPost={updatePost} id={post._id} autor='Вася Пупкин' />
            }
<style jsx>{`
a {
  text-decoration: none;
  color: blue;
  margin-right: 5px;
}
a:hover {
  opacity: 0.6;
}
`}</style>
        </div>
    )
}
View.getInitialProps = async (context) => {
    return { post: context.query.post }
}
export default withRouter(View);    