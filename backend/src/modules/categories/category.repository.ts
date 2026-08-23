import { PrismaClient, Category, Prisma } from "@prisma/client";
import { CategoryFilters } from "./category.types";

export class CategoryRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: { orderBy: { name: "asc" } },
        _count: { select: { products: { where: { status: "ACTIVE" } } } },
      },
    });
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: { slug },
      include: {
        parent: true,
        children: { orderBy: { name: "asc" } },
        _count: { select: { products: { where: { status: "ACTIVE" } } } },
      },
    });
  }

  async findByName(name: string, excludeId?: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });
  }

  async findBySlugExcluding(slug: string, excludeId: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        slug,
        id: { not: excludeId },
      },
    });
  }

  async findAll(
    filters: CategoryFilters,
    skip: number,
    limit: number,
  ): Promise<{ data: Category[]; total: number }> {
    const where: Prisma.CategoryWhereInput = {};

    if (filters.isActive !== undefined) {
      where.isActive = filters.isActive;
    }

    if (filters.parentId !== undefined) {
      where.parentId = filters.parentId;
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        where,
        orderBy: { name: "asc" },
        skip,
        take: limit,
        include: {
          parent: { select: { id: true, name: true, slug: true } },
          _count: { select: { products: { where: { status: "ACTIVE" } }, children: true } },
        },
      }),
      this.prisma.category.count({ where }),
    ]);

    return { data, total };
  }

  async findTree(): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: { parentId: null, isActive: true },
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: { where: { status: "ACTIVE" } } } },
        children: {
          where: { isActive: true },
          orderBy: { name: "asc" },
          include: {
            _count: { select: { products: { where: { status: "ACTIVE" } } } },
            children: {
              where: { isActive: true },
              orderBy: { name: "asc" },
              include: {
                _count: { select: { products: { where: { status: "ACTIVE" } } } },
              },
            },
          },
        },
      },
    });
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Category> {
    return this.prisma.category.create({
      data,
      include: {
        parent: true,
        children: true,
        _count: { select: { products: true } },
      },
    });
  }

  async update(id: string, data: Prisma.CategoryUpdateInput): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
      include: {
        parent: true,
        children: { orderBy: { name: "asc" } },
        _count: { select: { products: true } },
      },
    });
  }

  async delete(id: string): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }

  async countProducts(id: string): Promise<number> {
    return this.prisma.product.count({ where: { categoryId: id } });
  }

  async countChildren(id: string): Promise<number> {
    return this.prisma.category.count({ where: { parentId: id } });
  }

  async findDescendantIds(id: string): Promise<string[]> {
    const descendants: string[] = [];
    const queue: string[] = [id];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      const children = await this.prisma.category.findMany({
        where: { parentId: currentId },
        select: { id: true },
      });

      for (const child of children) {
        descendants.push(child.id);
        queue.push(child.id);
      }
    }

    return descendants;
  }

  async findBreadcrumb(id: string): Promise<Array<{ id: string; name: string; slug: string }>> {
    const breadcrumb: Array<{ id: string; name: string; slug: string }> = [];
    let currentId: string | null = id;

    // Safety limit to prevent infinite loops in case of data corruption
    const maxDepth = 10;
    let depth = 0;

    while (currentId && depth < maxDepth) {
      const category: { id: string; name: string; slug: string; parentId: string | null } | null =
        await this.prisma.category.findUnique({
          where: { id: currentId },
          select: { id: true, name: true, slug: true, parentId: true },
        });

      if (!category) break;

      breadcrumb.unshift({ id: category.id, name: category.name, slug: category.slug });
      currentId = category.parentId;
      depth++;
    }

    return breadcrumb;
  }
}
