import React, { Component, useState, useEffect } from 'react';
import NewsletterButton from '../styles/NewsletterButton$.jsx';
import useCallback from 'react';

// create newsletter component that holds the input, button, and title(?)
// when button is clicked
    // see if input is an actual email address
    // query database to see if email exists in database
        // if it doesn't
            // place email input into database
            // send a confirmation email using Twilio's SendGrid
        // else
            // alert user that email is already receiving newsletters

const Newsletter = (props) => {
    const [email, setEmail] = useState('');
    // const [input, setInput] = useState('');
    const handleClick = (event) => {
        event.preventDefault()
        setEmail(event.target.value);
        fetch(`/api/newsEmail/${email}`)
            .then(response => response.json())
            .then(data => console.log(data))
            console.log('sierra clicked this')
    };
    return (
        <form>
            <input type='text' placeholder='Email' name='mail' required onChange={event => setEmail(event.target.value)}></input>
            <NewsletterButton onClick={handleClick}>Sign Up</NewsletterButton>
            {/* <h1>{email}</h1> */}
            {/* <NewsletterButton>Sign Up</NewsletterButton> */}
        </form>
    )
}

export default Newsletter;