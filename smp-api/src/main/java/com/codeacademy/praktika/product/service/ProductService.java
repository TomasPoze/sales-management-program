package com.codeacademy.praktika.product.service;

import com.codeacademy.praktika.product.entity.Product;
import com.codeacademy.praktika.product.exception.ProductNotFoundException;
import com.codeacademy.praktika.product.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public void deleteProductByCategoryId(Long id) {
        productRepository.deleteProductsByProductCategoryId(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product was not found by this: " + id + " id"));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    public Page<Product> getProductsByCategoryPaginated(Long id,int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        return productRepository.findProductByProductCategoryId(id,pageable);
    }
}
