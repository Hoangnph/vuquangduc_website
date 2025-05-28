module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/about',
      handler: 'about.find',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/about',
      handler: 'about.update',
      config: { policies: [] },
    },
  ],
}; 