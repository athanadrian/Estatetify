import defaultStyles from 'common/config';

const subscriptionPlans = [
  {
    id: 1,
    plan: 'Free',
    enum: 'free',
    role: 'owner',
    price: '0',
    tax: '24',
    listings: 5,
    priceText: (
      <span>
        Register and you are an{' '}
        <span className={`text-owner-500 text-3xl tracking-wide`}>Owner</span>
      </span>
    ),
    list: [
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.feature_quality,
        text: '99.5% Uptime Guarantee',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',

        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.feature_update,
        text: 'Register Up to 5 Listings',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',

        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.storage,
        text: '500MB Cloud Storage',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',

        isFeature: true,
      },
      {
        change: 'color',
        icon: defaultStyles.icons.cancel,
        featureIcon: defaultStyles.icons.dashboard,
        text: 'Exclusive Dashboard',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',

        isFeature: false,
      },
      {
        change: 'color',
        icon: defaultStyles.icons.cancel,
        featureIcon: defaultStyles.icons.support,
        text: 'Personal Help Support',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',

        isFeature: false,
      },
      {
        change: 'color',
        icon: defaultStyles.icons.cancel,
        featureIcon: defaultStyles.icons.business,
        text: 'Enterprise SLA',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',

        isFeature: false,
      },
    ],
  },
  {
    id: 2,
    best: 'Best Value',
    plan: 'Basic',
    enum: 'basic',
    role: 'real-estater',
    price: '49',
    tax: '24',
    listings: 50,
    priceText: (
      <span>
        Become a{' '}
        <span className='text-real-estater-500 text-3xl tracking-wide'>
          Real-Estater
        </span>
      </span>
    ),
    list: [
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.feature_quality,
        text: '100% Uptime Guarantee',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.feature_update,
        text: 'Register Up to 50 Listings',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.storage,
        text: '1GB Cloud Storage',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.dashboard,
        text: 'Exclusive Dashboard',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.support,
        text: 'Personal Help Support',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
      {
        change: 'color',
        icon: defaultStyles.icons.cancel,
        featureIcon: defaultStyles.icons.business,
        text: 'Enterprise SLA',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: false,
      },
    ],
  },
  {
    id: 3,
    plan: 'Premium',
    enum: 'premium',
    role: 'agent',
    price: '79',
    tax: '24',
    listings: 1000,
    priceText: (
      <span>
        Be an{' '}
        <span className='text-agent-500 text-3xl tracking-wide'>Agent</span>
      </span>
    ),
    list: [
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.feature_quality,
        text: '100% Uptime Guarantee',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.feature_update,
        text: 'Register Unlimited Listings',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.storage,
        text: '10GB Cloud Storage',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.dashboard,
        text: 'Exclusive Dashboard',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.support,
        text: 'Personal Help Support',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
      {
        icon: defaultStyles.icons.checkIcon,
        featureIcon: defaultStyles.icons.business,
        text: 'Enterprise SLA',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum esse nisi assumenda consequatur! Asperiores dolorem nostrum ipsum cum velit nesciunt saepe et voluptatum eos deserunt sint accusantium, officia, voluptas quo!',
        isFeature: true,
      },
    ],
  },
];

export default subscriptionPlans;
