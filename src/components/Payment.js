import React, { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';

function Payment({ donationAmount }) {
    const [clientSecret, setClientSecret] = useState("");
    const stripePromise = loadStripe("pk_test_31wWplAqSyhI9dsktusPTV2y");
    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret,
        appearance,
    };

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5500/stripe/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: { id: "donation", amount: donationAmount } }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
    }, []);

    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm donationAmount={donationAmount} />
                </Elements>
            )}
        </div>
    );
}

export default Payment;