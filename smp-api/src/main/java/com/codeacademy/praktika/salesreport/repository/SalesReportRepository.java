package com.codeacademy.praktika.salesreport.repository;

import com.codeacademy.praktika.salesreport.entity.SalesReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.Month;

public interface SalesReportRepository extends JpaRepository<SalesReport, Long> {


    SalesReport getSalesReportBySalesDate(LocalDate salesDate);
}
