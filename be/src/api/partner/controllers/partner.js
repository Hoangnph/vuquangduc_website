module.exports = {
  async find(ctx) {
    try {
      const { query } = ctx;
      const { sort = 'order:asc', isActive = true } = query;

      // Chuẩn hóa sort cho Strapi v4
      let sortObj = { order: 'asc' };
      if (typeof sort === 'string' && sort.includes(':')) {
        const [field, direction] = sort.split(':');
        sortObj = { [field]: direction };
      }

      const entities = await strapi.entityService.findMany('api::partner.partner', {
        filters: { isActive },
        sort: sortObj,
        populate: ['logo'],
      });

      return entities;
    } catch (err) {
      ctx.body = err;
    }
  },

  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.entityService.findOne('api::partner.partner', id, {
        populate: ['logo'],
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },

  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.create('api::partner.partner', {
        data,
        populate: ['logo'],
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },

  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { data } = ctx.request.body;
      const entity = await strapi.entityService.update('api::partner.partner', id, {
        data,
        populate: ['logo'],
      });
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },

  async delete(ctx) {
    try {
      const { id } = ctx.params;
      const entity = await strapi.entityService.delete('api::partner.partner', id);
      return entity;
    } catch (err) {
      ctx.body = err;
    }
  },
}; 