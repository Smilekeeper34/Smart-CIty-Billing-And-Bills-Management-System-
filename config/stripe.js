const Stripe = require('stripe')('sk_test_51OuECp09L8fLaOX5c0vAp897AfzXElFjVrcUpYG9Y7Fj0xZpuNf8LXsn5RtJnwm9gHCvfWHYSi1PGcadBQ0RVQlv00w2jJUWH3');

// Stripe Checkout Session creation (Move from your earlier code)
const createCheckoutSession = async (lineItems) => {
  const session = await Stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  return session;
};

module.exports = { createCheckoutSession }; // Export the function(s) you need
