package com.codeacademy.praktika.csvfile.controller;

import com.codeacademy.praktika.csvfile.service.CsvService;
import com.codeacademy.praktika.csvfile.util.WriteCsvToResponse;
import com.codeacademy.praktika.salesreport.entity.SalesReport;
import com.codeacademy.praktika.salesreport.service.SalesReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Produces;
import java.util.List;

@RestController
@RequestMapping("/csv")
public class CsvController {

    private final CsvService csvService;
    private final SalesReportService salesReportService;

    public CsvController(CsvService csvService, SalesReportService salesReportService) {
        this.csvService = csvService;
        this.salesReportService = salesReportService;
    }

    @GetMapping(value = "/download", produces = "text/csv")
    @Produces("text/csv")
    public void createCsv(HttpServletResponse response) {
        try {
            List<SalesReport> salesReports = salesReportService.getAllSales();
            WriteCsvToResponse.writeReports(response.getWriter(),salesReports);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
