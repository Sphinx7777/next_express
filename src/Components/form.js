import React, { useState } from 'react'
import { Button } from './Button'

export const Form = (props) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const autor = props.autor

    const onChangeName = (e) => {
        setTitle(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const submit = async (e) => {
        e.preventDefault();
        const createdDate = new Date().toUTCString()
        const data = {
            post: {
                title, description, autor, createdDate
            },
            id: props.id
        }
        await props.newPost(data);
        setTitle('');
        setDescription('')
    }

    return (
        <form onSubmit={submit}>
            <input
                type='text'
                placeholder='Заголовок'
                value={title}
                onChange={onChangeName}
            />
            <input
                type='text'
                placeholder='Описание'
                value={description}
                onChange={onChangeDescription} />
            <Button 
                type='submit'>
                Отправить
            </Button>
        </form>
    )
}