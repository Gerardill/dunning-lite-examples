// webhook.js
// Ejemplo básico educacional. Para producción real, usa Dunning LITE (https://dunninglite.com)

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

const app = express();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.post('/webhook', express.raw({ type: 'application/json' }), (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        console.error(`❌ Webhook Error: ${err.message}`);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Escuchar el evento de cobro fallido (Dunning)
    if (event.type === 'invoice.payment_failed') {
        const invoice = event.data.object;

        // ⚠️ ATENCIÓN: Aquí deberías implementar tu lógica de envío de emails (Resend, SendGrid)
        // También tendrías que registrar en tu BBDD que este usuario está 'past_due'
        // Todo esto viene preconstruido y automatizado si usas Dunning LITE.

        console.log(`🚨 Pago fallido detectado.`);
        console.log(`- Monto: ${invoice.amount_due / 100} ${invoice.currency}`);
        console.log(`- ID Cliente Stripe: ${invoice.customer}`);
        console.log(`- Email del cliente: ${invoice.customer_email}`);
    }

    response.send();
});

app.listen(4242, () => console.log('Escuchando webhooks de Stripe en el puerto 4242'));
