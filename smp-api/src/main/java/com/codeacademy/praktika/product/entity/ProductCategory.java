package com.codeacademy.praktika.product.entity;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@Entity
@Table(name = "ProductsCategory")
@ApiModel(value = "ProductCategory", description = "ProductCategory")
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    @Column(name = "category")
    @NotNull
    @NotBlank
    private String category;

    @Tolerate
    public ProductCategory() {
    }
}
