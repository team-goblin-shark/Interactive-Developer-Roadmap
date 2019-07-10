import React from 'react';
import NewsletterButton from '../styles/NewsletterButton$.jsx';

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
    return (
        <form>
            <input type='text' placeholder='Email' name='mail' required></input>
            <NewsletterButton onClick = {this.handleClick}>Sign Up</NewsletterButton>
        </form>
    )
}

export default Newsletter;