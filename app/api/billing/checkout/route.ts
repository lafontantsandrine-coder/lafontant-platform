
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CheckoutInput } from "@/lib/validation/commercial";
import { getSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = CheckoutInput.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({
      mode: "demo",
      message: "Stripe is not configured yet. Checkout structure is ready."
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const prices: Record<string, number> = {
    trial: 0,
    monthly: 1900,
    annual: 19000
  };

  if (parsed.data.plan === "trial") {
    return NextResponse.json({
      mode: "trial",
      message: "Trial activation should be stored in the subscription table."
    });
  }

  const sessionCheckout = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session.email,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: prices[parsed.data.plan],
        product_data: {
          name: parsed.data.plan === "monthly" ? "Lafontant Monthly" : "Lafontant Annual"
        }
      }
    }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?payment=cancelled`
  });

  return NextResponse.json({ url: sessionCheckout.url });
}
