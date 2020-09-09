package com.codeacademy.praktika.product.repository;

import com.codeacademy.praktika.product.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<ProductCategory, Long> {
}
