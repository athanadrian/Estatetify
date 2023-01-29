const mainMenuLinks = (role) => [
  {
    name: 'home',
    link: '/home',
    auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
  },
  {
    name: 'offers',
    link: '/offers',
    auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
  },
  {
    name: 'buy',
    link: '/listings/sale',
    auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
  },
  {
    name: 'rent',
    link: '/listings/rent',
    auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
  },
  {
    name: 'sell',
    link: '/listings/add',
    auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
  },
  {
    name: 'pricing',
    link: '/subscriptions/plans',
    auth: ['user', 'owner', 'real-estater', 'agent', 'admin'],
  },
  {
    name: 'dashboard',
    link: `/${role}/dashboard`,
    auth: ['real-estater', 'agent', 'admin'],
  },
];

export default mainMenuLinks;
