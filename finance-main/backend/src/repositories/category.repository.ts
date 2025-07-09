export type Category = {
  id: string;
  name: string;
};

const categories: Category[] = [];

export const CategoryRepository = {
  findAll: () => categories,
  create: (category: Category) => {
    categories.push(category);
    return category;
  },
};