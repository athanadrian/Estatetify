const dashBoardLinks = (role) => [
  {
    name: 'dashboard',
    link: `/${role}/dashboard`,
    icon: 'dashboard',
    auth: ['real-estater', 'agent', 'admin'],
  },
  {
    name: 'Users',
    link: `/${role}/users`,
    icon: 'users',
    auth: ['admin'],
  },
  {
    name: 'Plans',
    link: `/${role}/plans`,
    icon: 'users',
    auth: ['admin'],
  },
  {
    name: 'manage',
    link: `/${role}/manage`,
    icon: 'manage',
    auth: ['agent', 'admin'],
  },
  {
    name: 'listings',
    link: `/${role}/listings`,
    icon: 'listings',
    auth: ['real-estater', 'agent', 'admin'],
  },
  {
    name: 'add listing',
    link: `/${role}/listings/add`,
    icon: 'add_property',
    auth: ['real-estater', 'agent', 'admin'],
  },
  {
    name: 'Subscriptions',
    link: `/${role}/subscriptions`,
    icon: 'subscriptions',
    auth: ['owner', 'real-estater', 'agent', 'admin'],
  },
];

export default dashBoardLinks;
