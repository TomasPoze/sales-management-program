package com.codeacademy.praktika.product.repository;

import com.codeacademy.praktika.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Transactional
    void deleteProductsByProductCategoryId(Long categoryId);


    Page<Product> findProductByProductCategoryId(Long id, Pageable pageable);

}
