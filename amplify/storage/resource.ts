import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'meniOrders',
  access: (allow) => ({
    'orders/*': [
      allow.guest.to(['read', 'write']),
    ],
  })
});
