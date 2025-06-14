module.exports = {
  routes: [
    { method: 'GET', path: '/blog-posts', handler: 'blog-post.find', config: { policies: [] } },
    { method: 'GET', path: '/blog-posts/:id', handler: 'blog-post.findOne', config: { policies: [] } },
    { method: 'POST', path: '/blog-posts', handler: 'blog-post.create', config: { policies: [] } },
    { method: 'PUT', path: '/blog-posts/:id', handler: 'blog-post.update', config: { policies: [] } },
    { method: 'DELETE', path: '/blog-posts/:id', handler: 'blog-post.delete', config: { policies: [] } },
  ],
}; 