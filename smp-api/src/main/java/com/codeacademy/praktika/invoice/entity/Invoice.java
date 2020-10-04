package com.codeacademy.praktika.invoice.entity;

import com.codeacademy.praktika.client.entity.Client;
import com.codeacademy.praktika.order.entity.Order;
import com.codeacademy.praktika.order.entity.OrderProduct;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "Invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String invoiceNumber;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime invoiceDate;

    @JsonIgnoreProperties({"orderItems"})
    @OneToOne(optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false)
    private Client client;

    @JsonIgnoreProperties({"order", "invoice"})
    @OneToMany(mappedBy = "invoice")
    private List<OrderProduct> invoiceItems = new ArrayList<>();

    private BigDecimal totalPrice;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime paymentPeriod;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime paidAt;


    public boolean isPaid() {
        return paidAt != null;
    }

    public void addItem(OrderProduct orderProduct) {
        orderProduct.setInvoice(this);
        invoiceItems.add(orderProduct);
    }

    public void generateInvoiceNumber(Invoice invoice) {
        invoice.setInvoiceNumber("S-" + invoice.getOrder().getId());
    }

    public void createPaymentPeriod() {
        paymentPeriod = invoiceDate.plusDays(15);
    }

    @PrePersist
    @PreUpdate
    public void recalculateTotalSum() {
        BigDecimal dec = new BigDecimal("0");
        for (OrderProduct product : invoiceItems) {
            dec = dec.add(product.getTotal());
        }
        totalPrice = dec;
    }
}
