export class CategoryValidator {
  static validateCreateCategory(dto: any): string | null {
    if (!dto) {
      return "body not found";
    }

    if (!dto.categoryName || typeof dto.categoryName !== "string") {
      return "categoryName is required and must be a valid string.";
    }

    return null;
  }
  static validateUpdateCategory(dto: any, categoryId: string): string | null {
   
    if (!categoryId || typeof categoryId !== "string") {
      return "Category ID is required and must be a valid string.";
    }

    return this.validateCreateCategory(dto);
  }

}
