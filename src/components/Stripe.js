import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Container, Form } from "react-bootstrap";
import { motion } from 'framer-motion';

import CheckoutForm from "./CheckoutForm";
import Navigation from "./Navigation";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_31wWplAqSyhI9dsktusPTV2y");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const [donationAmount, setDonationAmount] = useState(100); // 1€ by default
  console.log(donationAmount);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: { id: "donation", amount: donationAmount } }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [donationAmount]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
  const variants = {
    initial: {
        opacity: 0,
        trasition: {duration: 0.5},
        x: 100,
    },
    visible: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        transition: { duuration: 0.3 },
        x: -100,
    }
}
  return (
    <motion.div 
        transition={{ ease: "easeOut", duration: 1 }}
        initial="initial"
        animate="visible" 
        exit="exit"
        variants={variants}
    >  
        <Navigation />
        <Container className="mt-5">
            <h1><i class="fa-solid fa-mug-hot"></i> Payez-moi un café !</h1>
            <p>L'application vous plait ? Elle vous est uile ? Alors ma mission est réussie ! </p>
            <p>Les dons me permettent de financer cette application et de la maintenir. Alors si le coeur vous en dit, n'hésitez pas à me <i class="fa-solid fa-mug-hot"></i> Payer un café ! 😁</p>
            <h4>MERCI ! 💖</h4>
            <small>Magicement vôtre,</small>
        </Container>
        <Container className="mt-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Montant du don</Form.Label>
            <Form.Control 
                type="number" 
                placeholder="Saisissez le montant de votre café !" 
                onChange={(e) => setDonationAmount(e.target.value)} 
            />
            <Form.Text className="text-muted">
                Montant minimum : 1€
            </Form.Text>
        </Form.Group>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </Container>
    </motion.div>
  );
}