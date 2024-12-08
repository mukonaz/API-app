const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51Q7NSYExJqt3Kcq05Uh6f1tWdQW6XNVuZ38lrQvCG6Qo9T6kyYRQ6hrrZXX5lw1GCmSySCrBQ6B2gmZhXtGAVUhd00KdgLX412');

app.use(express.json());

app.post('/payment-sheet', async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));