import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { prisma } from "../lib/prisma";
import { SUBS_STATUS } from "../../generated/prisma/enums";

export const getPeriodEnd = (payLoad: Stripe.Subscription) => {
  const currentPeriodEndInMiliseconds =
    payLoad.items.data[0]?.current_period_end!;

  const currentPeriodEnd = new Date(currentPeriodEndInMiliseconds * 1000);

  return currentPeriodEnd;
};

export const handleCheckOutSession = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer as string;
  const stripeSubscriptionId = session.subscription as string;

  if (!userId || !stripeSubscriptionId || !stripeCustomerId) {
    throw new Error("webhook failed");
  }

  const stripeSubscriptions =
    await stripe.subscriptions.retrieve(stripeSubscriptionId);

  const currentPeriodEnd = getPeriodEnd(stripeSubscriptions);

  // const currentPeriodStart =
  //   stripeSubscriptions.items.data[0]?.current_period_start;

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

export const handleChangeSubscription = async (payLoad: Stripe.Subscription) => {
  const stripeSubscriptionId = payLoad.id;
  const status =
    payLoad.status === "active" || payLoad.status === "trialing"
      ? SUBS_STATUS.ACTIVE
      : payLoad.status === "canceled"
        ? SUBS_STATUS.CANCELED
        : SUBS_STATUS.EXPIRED;

  const currentPeriodEnd = getPeriodEnd(payLoad);

  const isSubscriptionExist = await prisma.subs.findUnique({
    where: {
      stripeSubscriptionId,
    },
  });

  if (!isSubscriptionExist) {
    console.log(
      `webHook : no subscription found for subscription id : ${stripeSubscriptionId}`,
    );

    return;
  }

  await prisma.subs.update({
    where: {
      stripeSubscriptionId,
    },
    data: {
      SUBS_STATUS,
      currentPeriodEnd,
    },
  });
};