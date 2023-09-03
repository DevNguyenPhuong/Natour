/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51NbC0CDuf7GSaJ7iaxroslib7UNqobMcjWbVebJe3lvcZwVJ1A9vAxtif76QM7EZ4D4VllZADEr4qF25t4ZjAQiz00aG69IDFY',
);

export const bookTour = async (tourId) => {
  try {
    // 1) get the checkout session from the API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}/`,
    );
    console.log(session);
    // 2) create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
