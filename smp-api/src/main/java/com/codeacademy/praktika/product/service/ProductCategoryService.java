package com.codeacademy.praktika.product.service;

import com.codeacademy.praktika.product.entity.ProductCategory;
import com.codeacademy.praktika.product.exception.CategoryNotFoundException;
import com.codeacademy.praktika.product.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {
    private CategoryRepository categoryRepository;

    public ProductCategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<ProductCategory> getAllProductCategories() {
        return categoryRepository.findAll();
    }

    public ProductCategory createCategory(ProductCategory productCategory) {
        return categoryRepository.save(productCategory);
    }

    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    public ProductCategory findCategoryById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category was not found by this: " + id + " id"));
    }

    public ProductCategory updateCategory(ProductCategory productCategory) {
        return categoryRepository.save(productCategory);
    }


}
