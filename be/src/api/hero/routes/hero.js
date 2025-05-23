module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/hero',
      handler: 'hero.find',
      config: {
        policies: [],
      },
    },
    {
      method: 'PUT',
      path: '/hero',
      handler: 'hero.update',
      config: {
        policies: [],
      },
    },
  ],
}; 