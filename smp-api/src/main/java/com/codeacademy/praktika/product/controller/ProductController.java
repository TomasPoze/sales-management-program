package com.codeacademy.praktika.product.controller;

import com.codeacademy.praktika.product.entity.Product;
import com.codeacademy.praktika.product.entity.ProductCategory;
import com.codeacademy.praktika.product.service.ProductCategoryService;
import com.codeacademy.praktika.product.service.ProductService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;
    private final ProductCategoryService categoryService;

    public ProductController(ProductService productService, ProductCategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @GetMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProductByCategoryId(id);
    }

    @PostMapping("/new")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Product createProduct(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "sku") String sku,
            @RequestParam(name = "price") BigDecimal price,
            @RequestParam(name = "purchase_cost") BigDecimal purchaseCost,
            @RequestParam(name = "category_id") Long categoryId
    ) {
        ProductCategory productCategory = categoryService.findCategoryById(categoryId);
        Product product = Product.builder()
                .title(title)
                .productCategory(productCategory)
                .sku(sku)
                .price(price)
                .purchaseCost(purchaseCost)
                .build();



        return productService.createProduct(product);
    }

    @PostMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestParam(name = "price") BigDecimal price,
            @RequestParam(name = "purchase_cost") BigDecimal purchaseCost,
            @RequestParam(name = "sku") String sku,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "category_id") Long categoryId
    ) {
        ProductCategory productCategory = categoryService.findCategoryById(categoryId);
        Product product = productService.getProductById(id);

        product.setPrice(price);
        product.setPurchaseCost(purchaseCost);
        product.setSku(sku);
        product.setTitle(title);
        product.setProductCategory(productCategory);


        return productService.updateProduct(product);
    }

}
