import Stripe from "stripe";
import config from "../../config/config";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";

const createCheckOutSession = async (userId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    });

    // old subscriber
    let stripeCustomerId = user.subscription?.id;

    if (!stripeCustomerId) {
      // new subscriber
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      });
      stripeCustomerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: config.stripe_product_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      success_url: `${config.app_url}/premium?success=true`,
      cancel_url: `${config.app_url}/payment?success=false`,
      metadata: { userId: user.id },
    });
    return session.url;
  });
  return {
    paymentUrl: transactionResult,
  };
};

const handleWebhook = async (payLoad: Buffer, signature: string) => {
  const endpointSecret = config.stripe_webhook_secret;

  const event = stripe.webhooks.constructEvent(
    payLoad,
    signature,
    endpointSecret,
  );

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckOutSession(event.data.object)
      break;
    case "customer.subscription.updated":
      break;
    case "customer.subscription.deleted":
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
      break;
  }
};

const handleCheckOutSession = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer as string;
  const stripeSubscriptionId = session.subscription as string;

  if (!userId || !stripeSubscriptionId || !stripeCustomerId) {
    throw new Error("webhook failed");
  }

  const stripeSubscriptions =
    await stripe.subscriptions.retrieve(stripeSubscriptionId);

  const currentPeriodStart =
    stripeSubscriptions.items.data[0]?.current_period_start;

  const currentPeriodEndInMiliseconds =
    stripeSubscriptions.items.data[0]?.current_period_end!;

  const currentPeriodEnd = new Date(currentPeriodEndInMiliseconds * 1000);

  await prisma.subs.upsert({
    where: {
      userId,
    },
    create: {
      userId,
      stripeCustomerId,
      stripeSubscriptionId,
      subsStatus: "ACTIVE",
      currentPeriodEnd,
    },
    update: {
      stripeCustomerId,
      stripeSubscriptionId,
      subsStatus: "ACTIVE",
      currentPeriodEnd,
    },
  });
};

export const subscriptionServices = {
  createCheckOutSession,
  handleWebhook,
};
