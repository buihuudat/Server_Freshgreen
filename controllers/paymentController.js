const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const paymentController = {
  pay: async (req, res) => {
    const { amount } = req.body;
    try {
      const intent = await stripe.paymentIntents.create({
        amount,
        currency: "vnd",
        automatic_payment_methods: { enabled: true },
      });

      return res
        .status(200)
        .json({ client_secret: intent.client_secret, id: intent.id });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = paymentController;
