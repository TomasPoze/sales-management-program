package com.codeacademy.praktika.product.entity;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter
@Setter
@Builder
@Entity
@Table(name = "Products")
@ApiModel(value = "Product", description = "Product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Long id;

    @Column(name = "title")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "category_id",nullable = false)
    private ProductCategory productCategory;

    @Column(name = "sku")
    private String sku;

    @Column(name = "price")
    @NotNull
    private BigDecimal price;

    @Column(name = "purchaseCost")
    @NotNull
    private BigDecimal purchaseCost;

    @Tolerate
    public Product() {
    }
}
