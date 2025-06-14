module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/testimonials',
      handler: 'testimonial.find',
      config: { policies: [] },
    },
    {
      method: 'GET',
      path: '/testimonials/:id',
      handler: 'testimonial.findOne',
      config: { policies: [] },
    },
    {
      method: 'POST',
      path: '/testimonials',
      handler: 'testimonial.create',
      config: { policies: [] },
    },
    {
      method: 'PUT',
      path: '/testimonials/:id',
      handler: 'testimonial.update',
      config: { policies: [] },
    },
    {
      method: 'DELETE',
      path: '/testimonials/:id',
      handler: 'testimonial.delete',
      config: { policies: [] },
    },
  ],
}; 