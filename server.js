const express = require('express');
const cors = require('cors');
//const { formatDate } = require('./src/common/helpers.js');
require('dotenv').config();
require('colors');
const stripe = require('stripe')(process.env.STRIPE_SK);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/checkout', async (req, res) => {
  res.send('Checkout atana');
});

app.post('/create-payment-intent', async (req, res) => {
  const {
    amount,
    //userId,
    userEmail,
    plan,
    shippingAddress: {
      name,
      line1,
      line2,
      city,
      country,
      postal_code,
      state,
      phone,
    },
  } = req.body;

  const description = `Estatetify payment: Subscription package ${plan}, Amount: ${amount}, User: ${userEmail}`;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: +amount * 100,
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1,
        line2,
        city,
        state,
        postal_code,
        country,
      },
      name,
      phone,
    },
    //receipt_email: userEmail,
  });
  //TODO
  //CREATE STRIPE TOKEN & CREATE CUSTOMER
  //   const customerDescription = `${userId}-${phone} / ${name}`;

  //   const customer = await stripe.customers.create({
  //     source: userId,
  //     email: userEmail,
  //     description:customerDescription,
  //   });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () =>
  console.log(
    `Server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
