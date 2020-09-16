package com.codeacademy.praktika.order.entity;


import com.codeacademy.praktika.client.entity.Client;
import com.codeacademy.praktika.invoice.entity.Invoice;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Tolerate;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Builder
@Entity
@Table(name = "Orders")
@ApiModel(value = "Order", description = "Order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @Column(name = "order_number")
    private String orderNumber;

    @Column(name = "order_date")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime localDateTime;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Client client;

    private BigDecimal totalSum;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    //    @JsonIgnore
    @OneToMany(mappedBy = "order")
    private List<OrderProduct> orderItems = new ArrayList<>();

    @JsonIgnoreProperties({"order","client"})
    @OneToOne
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;

    public void addItem(OrderProduct orderProduct) {
        orderProduct.setOrder(this);
        orderItems.add(orderProduct);
    }

    public void generateOrderNumber(Order order) {
        order.setOrderNumber("U-" + getId());
    }

    @PrePersist
    @PreUpdate
    public void recalculateTotalSum() {
        BigDecimal dec = new BigDecimal("0");
        for (OrderProduct product : orderItems) {
            dec = dec.add(product.getTotal());
        }
        totalSum = dec;
    }

    @Tolerate
    public Order() {
    }

}
