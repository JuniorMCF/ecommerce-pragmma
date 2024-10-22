export class Category {
  id?:string;
  categoryName:string;

  constructor(builder: CategoryBuilder) {
    this.id = builder.id
    this.categoryName = builder.categoryName
  }
}

export class CategoryBuilder {
  id?: string;
  categoryName: string = "";

  setId(id: string): CategoryBuilder {
    this.id = id;
    return this;
  }

  setCategoryName(categoryName: string): CategoryBuilder {
    this.categoryName = categoryName;
    return this;
  }

  build(){
    if(!this.categoryName){
        throw new Error("El campo 'categoryName' es obligatorios.");
    }

    return new Category(this)
  }
}
