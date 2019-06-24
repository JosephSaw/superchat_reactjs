import React from 'react'
import { useSelector } from 'react-redux';

export default function LoginPage() {
    const state = useSelector(state => state)
    console.log(state);
    return (
        <h1>Login Page</h1>
    )
}
