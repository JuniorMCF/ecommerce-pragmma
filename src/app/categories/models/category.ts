export class Category {
  id?: string;
  categoryName: string;

  constructor(categoryData: Partial<Category>) {
    this.id = categoryData.id;
    this.categoryName = categoryData.categoryName || "";
  }
}
