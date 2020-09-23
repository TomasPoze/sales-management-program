package com.codeacademy.praktika.pdf.entity;

import be.quodlibet.boxable.BaseTable;
import be.quodlibet.boxable.Cell;
import be.quodlibet.boxable.Row;
import be.quodlibet.boxable.datatable.DataTable;
import com.codeacademy.praktika.invoice.service.InvoiceService;
import com.codeacademy.praktika.order.entity.OrderProduct;
import com.codeacademy.praktika.order.service.OrderService;
import lombok.Getter;
import lombok.Setter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class DocumentCreation {

    private final OrderService orderService;
    private final InvoiceService invoiceService;

    public DocumentCreation(OrderService orderService, InvoiceService invoiceService) {
        this.orderService = orderService;
        this.invoiceService = invoiceService;
    }

    public ByteArrayOutputStream createDocument(Long id) throws IOException {
        List<OrderProduct> orderProduct = orderService.getOrderProducts(id);

        ByteArrayOutputStream output = new ByteArrayOutputStream();

        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        PDPageContentStream contentStream = new PDPageContentStream(document, page);

        String dir = "../smp-api/src/main/resources/fonts/ttf/";
        PDType0Font font = PDType0Font.load(document, new File(dir + "Roboto-Regular.ttf"));

        contentStream.beginText();
        contentStream.setFont(font, 11);
        contentStream.setLeading(14.5f);
        contentStream.newLineAtOffset(380, 740);
        contentStream.showText("PIRKĖJAS: " + invoiceService.getInvoice(id).getClient().getTitle());
        contentStream.newLine();
        contentStream.showText("ADRESAS: " + invoiceService.getInvoice(id).getClient().getAddress());
        contentStream.endText();

        contentStream.beginText();
        contentStream.setFont(font, 14);
        contentStream.newLineAtOffset(200, 620);
        contentStream.showText("PVM SĄSKAITA FAKTŪRA NR. " + invoiceService.getInvoice(id).getInvoiceNumber());
        contentStream.endText();

        contentStream.beginText();
        contentStream.setFont(font, 10);
        contentStream.newLineAtOffset(408, 570);
        contentStream.showText("Apmokėti iki : " + invoiceService.getInvoice(id).getPaymentPeriod().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        contentStream.endText();

        contentStream.beginText();
        contentStream.setFont(font, 10);
        contentStream.newLineAtOffset(400, 420);
        contentStream.showText("Suma apmokėti:   " + orderService.getOrderById(id).getTotalSum());
        contentStream.endText();


        //Dummy Table
        float margin = 50;

        // starting y position is whole page height subtracted by top and bottom margin
        float yStartNewPage = page.getMediaBox().getHeight() - (2 * margin);

        // we want table across whole page width (subtracted by left and right margin ofcourse)
        float tableWidth = page.getMediaBox().getWidth() - (2 * margin);

        boolean drawContent = true;

        float bottomMargin = 70;
        // y position is your coordinate of top left corner of the table
        float yPosition = 550;


        List<List> data = new ArrayList();
        data.add(new ArrayList<>(Arrays.asList("SKU", "Pavadinimas", "Kiekis", "Kaina", "Suma")));
        for (int i = 1; i <= orderProduct.size(); i++) {
            data.add(new ArrayList<>(Arrays.asList(orderProduct.get(i - 1).getProduct().getSku(), orderProduct.get(i - 1).getProduct().getTitle(), orderProduct.get(i - 1).getQuantity(), orderProduct.get(i - 1).getPricePerUnit(), orderProduct.get(i - 1).getTotal())));
        }
        BaseTable dataTable = new BaseTable(yPosition, yStartNewPage, bottomMargin, tableWidth, margin, document, page, true, true);
        DataTable t = new DataTable(dataTable, page);
        t.addListToTable(data, DataTable.HASHEADER);
        dataTable.draw();


        contentStream.close();
        document.save(output);
        document.close();

        return output;

//        contentStream.close();
//
//        document.save("C:/Users/Tomas/Desktop/temp/saskaita.pdf");
//
//        System.out.println("PDF Created");
//
//        document.close();
    }

}
