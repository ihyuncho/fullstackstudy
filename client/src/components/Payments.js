import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
    render(){
        return (
            <StripeCheckout 
                amount={500} //in cents
                token={token => console.log(token)} // returned by Stripe
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            />
        );
    }
}

export default Payments;