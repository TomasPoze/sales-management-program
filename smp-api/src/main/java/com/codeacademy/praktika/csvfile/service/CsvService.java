package com.codeacademy.praktika.csvfile.service;

import com.codeacademy.praktika.salesreport.entity.SalesReport;
import com.codeacademy.praktika.salesreport.repository.SalesReportRepository;
import com.opencsv.CSVWriter;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Service
public class CsvService {


    private final SalesReportRepository salesReportRepository;

    public CsvService(SalesReportRepository salesReportRepository) {
        this.salesReportRepository = salesReportRepository;
    }

    public byte[] createCsvFile() throws IOException {

        List<SalesReport> salesReport = salesReportRepository.findAll();

        File file = new File("C:\\Users\\Tomas\\file.csv");

        try {
            // create FileWriter object with file as parameter
            FileWriter outputfile = new FileWriter(file);

            // create CSVWriter object filewriter object as parameter
            CSVWriter writer = new CSVWriter(outputfile);

            // create a List which contains String array
            List<String[]> data = new ArrayList<String[]>();
            data.add(new String[] { "Name", "Class", "Marks" });
            data.add(new String[] { "Aman", "10", "620" });
            data.add(new String[] { "Suraj", "10", "630" });
            writer.writeAll(data);

            // closing writer connection
            writer.close();
        }
        catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;

    }


}
