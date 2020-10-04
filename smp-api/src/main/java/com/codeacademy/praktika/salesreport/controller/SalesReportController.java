package com.codeacademy.praktika.salesreport.controller;

import com.codeacademy.praktika.order.entity.Order;
import com.codeacademy.praktika.salesreport.entity.SalesReport;
import com.codeacademy.praktika.salesreport.service.SalesReportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
public class SalesReportController {

    private final SalesReportService salesReportService;

    public SalesReportController(SalesReportService salesReportService) {
        this.salesReportService = salesReportService;
    }

    @GetMapping("/report")
    public List<SalesReport> getList() {
        return salesReportService.getAllSales();
    }


    @PostMapping("/create/{id}")
    public void create(@PathVariable Long id) {
        salesReportService.createOrUpdateSalesReport(id);
    }

    @PostMapping("/paid/{id}")
    public void updateProfit(@PathVariable Long id){
        salesReportService.calculateProfitAfterOrderPaid(id);
    }

}
