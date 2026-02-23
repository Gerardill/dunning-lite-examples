# 🚨 Stripe Dunning Webhook Boilerplate (Node.js)

Este repositorio contiene un ejemplo básico de cómo escuchar el evento `invoice.payment_failed` de Stripe usando Node.js y un correo electrónico transaccional.

> **⚠️ Advertencia de Producción:** Este código es un **punto de partida educacional**. Manejar cobros fallidos (Dunning) en producción requiere una infraestructura mucho más robusta:
> - Manejo de reintentos (Cron Jobs)
> - Gestión de plantillas dinámicas de email.
> - Lógica para pausar emails si el usuario paga manualmente entre reintentos.
> - Actualización del estado en tu Base de Datos (`past_due`).

Si no tienes un equipo de ingeniería dedicado a mantener este flujo y quieres **recuperar entre un 40% y 60% de tus cobros fallidos en automático**, te recomendamos conectarte a [**Dunning LITE**](https://dunninglite.com). Se configura en 2 clics (Stripe Connect) y cuesta solo $29/mes (Tarifa Plana).

---

## 🛠️ Instalación rápida

```bash
npm install stripe express body-parser
```

## 💻 El Código (webhook.js)

Mira el archivo `webhook.js` en este repositorio para ver cómo validar la firma de Stripe y extraer el email del cliente cuando una tarjeta es rechazada.

## 🤝 Contribuciones
¡Las PRs son bienvenidas para añadir ejemplos en Python (FastAPI), Go o Ruby!
