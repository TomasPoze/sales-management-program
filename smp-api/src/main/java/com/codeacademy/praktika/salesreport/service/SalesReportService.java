package com.codeacademy.praktika.salesreport.service;

import com.codeacademy.praktika.invoice.entity.Invoice;
import com.codeacademy.praktika.invoice.service.InvoiceService;
import com.codeacademy.praktika.order.entity.Order;
import com.codeacademy.praktika.order.entity.OrderStatus;
import com.codeacademy.praktika.order.service.OrderService;
import com.codeacademy.praktika.salesreport.entity.SalesReport;
import com.codeacademy.praktika.salesreport.repository.SalesReportRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class SalesReportService {
    private final SalesReportRepository reportRepository;
    private final OrderService orderService;
    private final InvoiceService invoiceService;

    public SalesReportService(SalesReportRepository reportRepository, OrderService orderService, InvoiceService invoiceService) {
        this.reportRepository = reportRepository;
        this.orderService = orderService;
        this.invoiceService = invoiceService;
    }

    public List<SalesReport> getAllSales() {
        return reportRepository.findAll();
    }


    public SalesReport createSalesReport(Order order) {
        SalesReport salesReport = new SalesReport();

        if (order.getOrderStatus().equals(OrderStatus.APMOKĖTAS)) {
            salesReport.setPaidIvoicesSum(order.getTotalSum());
            BigDecimal apmoketa = BigDecimal.valueOf(0);

            for (int i = 0; i < order.getOrderItems().size(); i++) {
                apmoketa = apmoketa.add(order.getOrderItems().get(i).getProductCost());
            }
            salesReport.setProfit(salesReport.getPaidIvoicesSum().subtract(apmoketa));
        } else {
            salesReport.setPaidIvoicesSum(BigDecimal.valueOf(0));
            salesReport.setProfit(BigDecimal.valueOf(0));
        }
        salesReport.setSalesQuantity(1);
        salesReport.setTotalSalesSum(order.getTotalSum());
        salesReport.setSalesDate(LocalDate.now().withMonth(order.getLocalDateTime().getMonthValue()));
        return reportRepository.save(salesReport);
    }

    public SalesReport findByMonth(int month) {
        List<SalesReport> salesReports = reportRepository.findAll();
        for (SalesReport salesReport : salesReports) {
            if (salesReport.getSalesDate().getMonthValue() == month) {
                return reportRepository.findById(salesReport.getId()).orElseThrow();
            }
        }
        return null;
    }

    public void createOrUpdateSalesReport(Long id) {
        Order order = orderService.getOrderById(id);
        if (findByMonth(order.getLocalDateTime().getMonthValue()) != null) {
            SalesReport salesReport = findByMonth(order.getLocalDateTime().getMonthValue());
            salesReport.addToSalesQuantity();
            salesReport.addToSalesSum(order.getTotalSum());
            if (order.getOrderStatus().equals(OrderStatus.APMOKĖTAS)) {
                salesReport.addInvoicesSum(order.getTotalSum());
                BigDecimal paid = BigDecimal.valueOf(0);
                for (int i = 0; i < order.getOrderItems().size(); i++) {
                    paid = paid.add(order.getOrderItems().get(i).getProductCost());
                }
                salesReport.setProfit(salesReport.getPaidIvoicesSum().subtract(paid));
            }
            reportRepository.save(salesReport);
        } else {
            createSalesReport(order);
        }
    }

    public void calculateProfitAfterOrderPaid(Long id){
        Invoice invoice = invoiceService.getInvoice(id);
        Order order = orderService.getOrderById(invoice.getOrder().getId());
        if (findByMonth(order.getLocalDateTime().getMonthValue()) != null){
            SalesReport salesReport = findByMonth(order.getLocalDateTime().getMonthValue());
            salesReport.addInvoicesSum(order.getTotalSum());
            BigDecimal paid = BigDecimal.valueOf(0);
            for (int i = 0; i < order.getOrderItems().size(); i++) {
                paid = paid.add(order.getOrderItems().get(i).getProductCost());
            }
            salesReport.addProfit(order.getTotalSum().subtract(paid));
        reportRepository.save(salesReport);
        }
    }

//    public SalesReport createOrUpdateSalesReport(){
//        List<Order> orderList = orderRepository.findAll();
//        List<SalesReport> salesReport = reportRepository.findAll();
//        for (int i = 0; i < orderList.size();i++){
//            if (orderList.get(i).getLocalDateTime().getMonth() != reportRepository.getSalesReportBySalesDate(orderList.get(i).getLocalDateTime().getMonth())){
//
//            }
//        }
//
//        return reportRepository.save();
//    }
}
