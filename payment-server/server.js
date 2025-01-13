const express = require('express');
const app = express();
const cors = require('cors');

const stripe = require('stripe')('sk_test_51Q7NSYExJqt3Kcq05Uh6f1tWdQW6XNVuZ38lrQvCG6Qo9T6kyYRQ6hrrZXX5lw1GCmSySCrBQ6B2gmZhXtGAVUhd00KdgLX412');

app.use(cors());
app.use(express.json());

app.post('/payment-sheet', async (req, res) => {
  try {
    const { amount } = req.body;

    // Create a new customer
    const customer = await stripe.customers.create();

    // Create an ephemeral key for the customer
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-11-15' }
    );

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
    });

    // Send the necessary details to the client
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
