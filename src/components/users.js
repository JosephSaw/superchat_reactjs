import React from 'react'

export default function users(props) {
    return (
        <ul>
            {props.users.map((user) => <li key={user.uid}>{user.username}</li>)}
        </ul>
    )
}
