package com.codeacademy.praktika.invoice.controller;

import com.codeacademy.praktika.invoice.entity.Invoice;
import com.codeacademy.praktika.invoice.service.InvoiceService;
import com.codeacademy.praktika.salesreport.service.SalesReportService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoice")
public class InvoiceController {
    private final InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }

    @PostMapping("/new/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public Invoice createInvoice(@PathVariable Long id){
        return invoiceService.createInvoice(id);
    }

    @GetMapping("/{id}")
    public Invoice getInvoice(@PathVariable Long id){
        return invoiceService.getInvoice(id);
    }

    @PostMapping("/paid/{id}")
    public Invoice invoiceGetsPaid(@PathVariable Long id){
        return invoiceService.setInvoicePaid(id);
    }

    @GetMapping("/invoices")
    public List<Invoice> getAllInvoices(){
        return invoiceService.getAllInvoices();
    }
}
