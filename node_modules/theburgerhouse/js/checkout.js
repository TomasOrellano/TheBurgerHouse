import express from "express";
import cors from "cors";
import Vexor from "vexor";
import dotenv from "dotenv";

dotenv.config();

// Configuración de Vexor
const vexorInstance = new Vexor({
  publishableKey: "vx_prod_pk_6579b81aef01ccbc7a01b4b681e7d20e_908592ee_2def_4260_a2ff_061a456497e2_f44350",
  projectId: "676c94217671760a5eabd86d",
  apiKey:"•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••" , // Asegúrate de tener esta variable en tu archivo .env
});

const app = express();
const port = 5500;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta para crear pagos
app.post('/create_payment', async (req, res) => {
  const { product } = req.body;

  if (!product || !product.precio || !product.nombre || !product.cantidad) {
    return res.status(400).json({ error: 'Los datos del producto son incorrectos' });
  }

  try {
    const paymentResponse = await vexorInstance.pay.mercadopago({
      items: [
        {
          title: product.nombre,
          unit_price: product.precio,
          quantity: product.cantidad,
        },
      ],
    });

    res.status(200).json({ payment_url: paymentResponse.payment_url });
  } catch (error) {
    console.error('Error al crear el pago:', error);
    res.status(500).json({ error: 'Error al crear el pago' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
