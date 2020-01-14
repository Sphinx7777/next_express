import fetch from 'isomorphic-unfetch'


export const postsApi = {

    async getAllPosts() {
        try {
            const resJson = await fetch('http://localhost:3000/posts/all');
            const res = await resJson.json();
            return res.data
        } catch (err) {
            console.log(`some error ${err.message}`)
        }
    },

    async createNewPost(post) {
        try {
            const resJson = await fetch('http://localhost:3000/posts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(post)
            })
            const res = await resJson.json()
            return res
        } catch (err) {
            console.log(`some error ${err.message}`)
        }
    },

    async updatePost(data) {
        try {
            const resJson = await fetch(`http://localhost:3000/posts/update/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data.post)
        })
            const res = await resJson.json()
            return res
        } catch (err) {
            console.log(`some error ${err.message}`)
        }
    },

    async dellPost(id) {
        try {
            const resJson = await fetch(`http://localhost:3000/posts/del/${id}`, {
                method: 'DELETE'
            })
            const res = await resJson.json()
            return res
        } catch (err) {
            console.log(`some error ${err.message}`)
        }
    }
};