package com.codeacademy.praktika.product.repository;

import com.codeacademy.praktika.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Transactional
    void deleteProductsByProductCategoryId(Long categoryId);
}
