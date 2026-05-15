export declare class CreateProductDto {
    name: string;
    description?: string;
    category: string;
    price: number;
    discountPrice?: number;
    stock?: number;
    images?: string[];
    specifications?: Record<string, string>;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    category?: string;
    price?: number;
    discountPrice?: number;
    stock?: number;
    images?: string[];
    specifications?: Record<string, string>;
    featured?: boolean;
    active?: boolean;
}
//# sourceMappingURL=product.dto.d.ts.map