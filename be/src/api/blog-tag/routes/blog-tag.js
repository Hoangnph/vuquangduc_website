module.exports = {
  routes: [
    { method: 'GET', path: '/blog-tags', handler: 'blog-tag.find', config: { policies: [] } },
    { method: 'GET', path: '/blog-tags/:id', handler: 'blog-tag.findOne', config: { policies: [] } },
    { method: 'POST', path: '/blog-tags', handler: 'blog-tag.create', config: { policies: [] } },
    { method: 'PUT', path: '/blog-tags/:id', handler: 'blog-tag.update', config: { policies: [] } },
    { method: 'DELETE', path: '/blog-tags/:id', handler: 'blog-tag.delete', config: { policies: [] } },
  ],
}; 