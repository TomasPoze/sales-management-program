package com.codeacademy.praktika.salesreport.entity;

import com.codeacademy.praktika.order.entity.Order;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "SalesReports")
public class SalesReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int salesQuantity;

    private BigDecimal totalSalesSum;

    private BigDecimal paidIvoicesSum;

    private BigDecimal profit;

    private LocalDate salesDate;

    public void addToSalesSum(BigDecimal sum){
        totalSalesSum = totalSalesSum.add(sum);
    }

    public void addInvoicesSum(BigDecimal sum){
        paidIvoicesSum = paidIvoicesSum.add(sum);
    }

    public void addToSalesQuantity(){
        salesQuantity++;
    }

    public void addProfit(BigDecimal sum){
        profit = profit.add(sum);
    }
}
