import React, { useState } from 'react'

export const Form = (props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }

    const submit = async (e) => {
        e.preventDefault();
        await props.newPost({ name, description });
        setName('');
        setDescription('')

    }

    return (
        <form onSubmit={submit}>
            <input type='text' placeholder='name' value={name} onChange={onChangeName} />
            <input type='text' placeholder='desription' value={description} onChange={onChangeDescription} />
            <button type='submit'>Submit</button>
        </form>
    )
}