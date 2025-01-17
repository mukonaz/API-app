const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('??????');

const app = express();
const BASE_URL = 'http://192.168.1.132:3000';

app.use(cors());
app.use(express.json());

app.post('/payment-sheet', async (req, res) => {
  try {
    const { amount } = req.body;
    
    const customer = await stripe.customers.create();
    
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-11-15' }
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customer.id,
    });

    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));