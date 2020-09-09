package com.codeacademy.praktika.product.controller;

import com.codeacademy.praktika.product.entity.ProductCategory;
import com.codeacademy.praktika.product.service.ProductCategoryService;
import com.codeacademy.praktika.product.service.ProductService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class ProductCategoryController {
    private final ProductCategoryService categoryService;
    private final ProductService productService;

    public ProductCategoryController(ProductCategoryService categoryService, ProductService productService) {
        this.categoryService = categoryService;
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ProductCategory getProductCategoryById(@PathVariable Long id){
        return categoryService.findCategoryById(id);
    }

    @GetMapping("/categories")
    public List<ProductCategory> getProductCategories(){
        return categoryService.getAllProductCategories();
    }

    @PostMapping("/new")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ProductCategory createCategory(
            @RequestParam(name = "category") String category
    ) {
        ProductCategory productCategory = ProductCategory.builder()
                .category(category)
                .build();
        return categoryService.createCategory(productCategory);
    }


    @GetMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public void deleteCategory(@PathVariable Long id){
        productService.deleteProductByCategoryId(id);
        categoryService.deleteCategory(id);
    }

    @PostMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public ProductCategory updateCategory(
            @PathVariable Long id,
            @RequestParam(name = "category") String category
            ){
            ProductCategory productCategory = categoryService.findCategoryById(id);
            productCategory.setCategory(category);
        return categoryService.updateCategory(productCategory);
    }
}
