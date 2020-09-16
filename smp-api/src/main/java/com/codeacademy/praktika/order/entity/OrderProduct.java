package com.codeacademy.praktika.order.entity;

import com.codeacademy.praktika.invoice.entity.Invoice;
import com.codeacademy.praktika.product.entity.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "OrderProducts")
@ApiModel(value = "OrderProduct", description = "OrderProducts")
public class OrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties({"orderItems"})
    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Order order;

    @JsonIgnoreProperties({"invoiceItems"})
    @ManyToOne
    private Invoice invoice;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Product product;

    @NotNull
    private BigDecimal pricePerUnit;

    @NotNull
    private BigDecimal quantity;

    @NotNull
    private BigDecimal total;

    @PrePersist
    @PreUpdate
    public void recalculateTotalPrice(){
        total = pricePerUnit.multiply(quantity);
    }

    @Tolerate
    public OrderProduct() {
    }

}
