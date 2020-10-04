package com.codeacademy.praktika.invoice.service;

import com.codeacademy.praktika.invoice.entity.Invoice;
import com.codeacademy.praktika.invoice.exception.InvoiceNotFoundException;
import com.codeacademy.praktika.invoice.repository.InvoiceRepository;
import com.codeacademy.praktika.order.entity.Order;

import com.codeacademy.praktika.order.entity.OrderStatus;
import com.codeacademy.praktika.order.service.OrderService;
import com.codeacademy.praktika.salesreport.service.SalesReportService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;


@Service
public class InvoiceService {
    private final InvoiceRepository invoiceRepository;
    private final OrderService orderService;



    public InvoiceService(InvoiceRepository invoiceRepository, OrderService orderService) {
        this.invoiceRepository = invoiceRepository;
        this.orderService = orderService;
    }


    public Invoice createInvoice(Long id) {
        Invoice invoice = new Invoice();

        Order order = orderService.getOrderById(id);

        LocalDateTime localDateTime = LocalDateTime.now();

        invoice.setInvoiceDate(localDateTime);
        invoice.createPaymentPeriod();
        invoice.setOrder(order);
        invoice.generateInvoiceNumber(invoice);
        invoice.setClient(order.getClient());
        for (int i = 0; i < order.getOrderItems().size(); i++) {
            invoice.addItem(order.getOrderItems().get(i));
        }
        invoice.recalculateTotalSum();
        invoice.isPaid();
        order.setInvoice(invoice);
        order.setOrderStatus(OrderStatus.LAUKIAMA_APMOKEJIMO);


        return invoiceRepository.save(invoice);
    }

    public Invoice getInvoice(Long id) {
        return invoiceRepository.findById(id).orElseThrow(() -> new InvoiceNotFoundException("Invoice was not found by this: " + id + " id!"));
    }

    public Invoice setInvoicePaid(Long id) {
        Invoice invoice = getInvoice(id);
        Order order = orderService.getOrderById(invoice.getOrder().getId());
        invoice.setPaidAt(LocalDateTime.now());
        order.setOrderStatus(OrderStatus.APMOKĖTAS);
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }
}
