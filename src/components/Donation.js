import { Button, Container, Form } from "react-bootstrap";
import { domAnimation, motion } from "framer-motion";
import Navigation from "./Navigation";
import { useRef, useState } from "react";
import Payment from "./Payment";

function Stripe() {
  const [error, setError] = useState(false);
  // const donationForm = useRef();
  const [amountValide, setAmountValide] = useState(false);
  const [donationAmount, setDonationAmount] = useState(null);
  const variants = {
    initial: {
      opacity: 0,
      trasition: { duration: 0.5 },
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
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {amount} = e.target.elements;
      setDonationAmount(amount.value)
      setAmountValide(true)
    if(amount.value >= 1) {
      
    }else {
      setError(true);
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
        <h1>
          <i class="fa-solid fa-mug-hot"></i> Payez-moi un café !
        </h1>
        <p>
          L'application vous plait ? Elle vous est utile ? Alors ma mission est
          réussie !
        </p>
        <p>
          Les dons me permettent de financer cette application et de la
          maintenir. Alors si le coeur vous en dit, n'hésitez pas à me{" "}
          <i class="fa-solid fa-mug-hot"></i> Payer un café ! 😁
        </p>
        <h4>MERCI ! 💖</h4>
        <small>Magicement vôtre,</small>
      </Container>
      <Container className="mt-5">
        {amountValide ? (
          <Payment donationAmount={donationAmount} />
        ) : (
          <Form action="/checkout" method="post" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <i class="fa-solid fa-piggy-bank"></i> Montant du don
              </Form.Label>
              <Form.Control
                type="number"
                min="1"
                placeholder="Saisissez le montant de votre café"
                name="amount"
              />
              <Form.Text className="text-muted">Montant minimum : 1€</Form.Text>
            </Form.Group>
            <Button variant="success" type="submit">
              Continuer
            </Button>
          </Form>
          // {error && <span style={{ color: "red" }}>Une erreur est survenue. Veuillez indiquer au minimum 1€.</span>}
        )}
      </Container>
    </motion.div>
  );
}

export default Stripe;
