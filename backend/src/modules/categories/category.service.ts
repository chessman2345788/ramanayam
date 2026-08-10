import { Category } from "@prisma/client";
import { CategoryRepository } from "./category.repository";
import { CategoryFilters } from "./category.types";
import { AppError } from "../../common/errors";
import { formatPaginationResult, PaginationResult } from "../../components/pagination";

export class CategoryService {
  constructor(private repository: CategoryRepository) {}

  async list(filters: CategoryFilters, page: number, limit: number): Promise<PaginationResult<Category>> {
    const skip = (page - 1) * limit;
    const { data, total } = await this.repository.findAll(filters, skip, limit);
    return formatPaginationResult(data, total, page, limit);
  }

  async getBySlug(slug: string): Promise<{ category: Category; breadcrumb: Array<{ id: string; name: string; slug: string }> }> {
    const category = await this.repository.findBySlug(slug);
    if (!category) {
      throw new AppError("Category not found", 404);
    }

    const breadcrumb = await this.repository.findBreadcrumb(category.id);

    return { category, breadcrumb };
  }

  async getTree(): Promise<Category[]> {
    return this.repository.findTree();
  }

  async create(data: {
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    parentId?: string | null;
    isActive?: boolean;
  }): Promise<Category> {
    // Check slug uniqueness
    const existingSlug = await this.repository.findBySlug(data.slug);
    if (existingSlug) {
      throw new AppError("A category with this slug already exists", 409);
    }

    // Check duplicate name
    const existingName = await this.repository.findByName(data.name);
    if (existingName) {
      throw new AppError("A category with this name already exists", 409);
    }

    // Validate parent exists if parentId provided
    if (data.parentId) {
      const parent = await this.repository.findById(data.parentId);
      if (!parent) {
        throw new AppError("Parent category not found", 404);
      }
    }

    // Build create input — connect parent via relation if parentId is provided
    const createInput: any = {
      name: data.name,
      slug: data.slug,
      description: data.description ?? null,
      image: data.image ?? null,
      isActive: data.isActive ?? true,
    };

    if (data.parentId) {
      createInput.parent = { connect: { id: data.parentId } };
    }

    return this.repository.create(createInput);
  }

  async update(
    id: string,
    data: {
      name?: string;
      slug?: string;
      description?: string | null;
      image?: string | null;
      parentId?: string | null;
      isActive?: boolean;
    },
  ): Promise<Category> {
    // Check category exists
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError("Category not found", 404);
    }

    // Check slug uniqueness (excluding self)
    if (data.slug && data.slug !== existing.slug) {
      const slugConflict = await this.repository.findBySlugExcluding(data.slug, id);
      if (slugConflict) {
        throw new AppError("A category with this slug already exists", 409);
      }
    }

    // Check name uniqueness (excluding self)
    if (data.name && data.name !== existing.name) {
      const nameConflict = await this.repository.findByName(data.name, id);
      if (nameConflict) {
        throw new AppError("A category with this name already exists", 409);
      }
    }

    // Circular reference prevention for parentId changes
    if (data.parentId !== undefined) {
      if (data.parentId === id) {
        throw new AppError("A category cannot be its own parent", 400);
      }

      if (data.parentId !== null) {
        // Verify parent exists
        const parent = await this.repository.findById(data.parentId);
        if (!parent) {
          throw new AppError("Parent category not found", 404);
        }

        // Check that parent is not a descendant of this category
        const descendantIds = await this.repository.findDescendantIds(id);
        if (descendantIds.includes(data.parentId)) {
          throw new AppError("Cannot set parent to a descendant category (circular reference)", 400);
        }
      }
    }

    // Build update input — handle parentId relation properly
    const updateInput: any = {};

    if (data.name !== undefined) updateInput.name = data.name;
    if (data.slug !== undefined) updateInput.slug = data.slug;
    if (data.description !== undefined) updateInput.description = data.description;
    if (data.image !== undefined) updateInput.image = data.image;
    if (data.isActive !== undefined) updateInput.isActive = data.isActive;

    if (data.parentId !== undefined) {
      if (data.parentId === null) {
        updateInput.parent = { disconnect: true };
      } else {
        updateInput.parent = { connect: { id: data.parentId } };
      }
    }

    return this.repository.update(id, updateInput);
  }

  async delete(id: string): Promise<void> {
    // Check category exists
    const existing = await this.repository.findById(id);
    if (!existing) {
      throw new AppError("Category not found", 404);
    }

    // Block delete if category has products
    const productCount = await this.repository.countProducts(id);
    if (productCount > 0) {
      throw new AppError(
        `Cannot delete category with ${productCount} assigned product(s). Reassign products first.`,
        409,
      );
    }

    // Block delete if category has children
    const childCount = await this.repository.countChildren(id);
    if (childCount > 0) {
      throw new AppError(
        `Cannot delete category with ${childCount} child categor${childCount === 1 ? "y" : "ies"}. Delete or reassign children first.`,
        409,
      );
    }

    await this.repository.delete(id);
  }
}
