package com.codeacademy.praktika.csvfile.util;


import com.codeacademy.praktika.salesreport.entity.SalesReport;
import com.opencsv.CSVWriter;
import com.opencsv.bean.ColumnPositionMappingStrategy;

import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.PrintWriter;
import java.util.Comparator;
import java.util.List;


public class WriteCsvToResponse {

    private static final Logger LOGGER = LoggerFactory.getLogger(WriteCsvToResponse.class);

    public static void writeReports(PrintWriter writer, List<SalesReport> salesReports) {

        try {

            ColumnPositionMappingStrategy<SalesReport> mapStrategy
                    = new ColumnPositionMappingStrategy<>();

            mapStrategy.setType(SalesReport.class);

            String[] columns = new String[]{"id", "salesDate", "salesQuantity", "totalSalesSum", "paidIvoicesSum", "profit"};

            mapStrategy.setColumnMapping(columns);
            mapStrategy.setColumnOrderOnWrite(Comparator.naturalOrder());

            StatefulBeanToCsv<SalesReport> btcsv = new StatefulBeanToCsvBuilder<SalesReport>(writer)
                    .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
                    .withMappingStrategy(mapStrategy)
                    .withSeparator(',')
                    .build();

            btcsv.write(salesReports);

        } catch (CsvException ex) {

            LOGGER.error("Error mapping Bean to CSV", ex);
        }
    }

    public static void writeReport(PrintWriter writer, SalesReport salesReport) {

        try {

            ColumnPositionMappingStrategy<SalesReport> mapStrategy
                    = new ColumnPositionMappingStrategy<>();

            mapStrategy.setType(SalesReport.class);

            String[] columns = new String[]{"id", "salesDate", "salesQuantity", "totalSalesSum", "paidIvoicesSum", "profit"};

            mapStrategy.setColumnMapping(columns);


            StatefulBeanToCsv<SalesReport> btcsv = new StatefulBeanToCsvBuilder<SalesReport>(writer)
                    .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
                    .withMappingStrategy(mapStrategy)
                    .withSeparator(',')
                    .build();

            btcsv.write(salesReport);

        } catch (CsvException ex) {

            LOGGER.error("Error mapping Bean to CSV", ex);
        }
    }
}