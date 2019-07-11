import React from 'react';
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

const Newsletter = () => {
    const handleClick = () => {
        fetch(`/api/resources/${props.email}`)
            .then(response => response.json())
            // .then(data => )
    };
    return (
        <form>
            <input type='text' placeholder='Email' name='mail' required></input>
            <NewsletterButton onClick={handleClick}>Sign Up</NewsletterButton>
            {/* <NewsletterButton>Sign Up</NewsletterButton> */}
        </form>
    )
}

export default Newsletter;