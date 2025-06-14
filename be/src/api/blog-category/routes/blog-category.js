module.exports = {
  routes: [
    { method: 'GET', path: '/blog-categories', handler: 'blog-category.find', config: { policies: [] } },
    { method: 'GET', path: '/blog-categories/:id', handler: 'blog-category.findOne', config: { policies: [] } },
    { method: 'POST', path: '/blog-categories', handler: 'blog-category.create', config: { policies: [] } },
    { method: 'PUT', path: '/blog-categories/:id', handler: 'blog-category.update', config: { policies: [] } },
    { method: 'DELETE', path: '/blog-categories/:id', handler: 'blog-category.delete', config: { policies: [] } },
  ],
}; 