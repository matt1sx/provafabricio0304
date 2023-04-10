const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoriesController {
  async index(request, response) {
    const categorys = await CategoriesRepository.findAll();

    response.json(categorys);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Produto não encontrado' });
    }
    response.json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: "Categoria cadastrada sem nome" })
    }
    const category = await CategoriesRepository.create({name});
    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name} = request.body;
    const categoryExists = await CategoriesRepository.findById(id);
    if (!categoryExists) {
      return response.status(404).json({ error: "Não existe produto com esse id cadastrado" });
    }
    if (!name) {
      return response.status(400).json({ error: "Nome precisa ser preenchido ou válido" });
    }
    const category = await CategoriesRepository.update(id, {name});
    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(403).json({ error: "Produto Não Encontrado" });
    }
    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoriesController();
