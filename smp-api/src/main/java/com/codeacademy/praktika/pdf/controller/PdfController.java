package com.codeacademy.praktika.pdf.controller;

import com.codeacademy.praktika.pdf.entity.DocumentCreation;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import java.io.*;

@RestController
@RequestMapping("/pdf")
public class PdfController {

    private DocumentCreation documentCreation;

    public PdfController(DocumentCreation documentCreation) {
        this.documentCreation = documentCreation;
    }


    @GetMapping("/{id}")
    @Produces("application/pdf")
    public void createPdf(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) throws IOException {
//        File resultFile = File.createTempFile("saskaita", ".pdf");
//
//        ByteArrayOutputStream byteArrayOutputStream = documentCreation.createDocument(id);
//
//        try (OutputStream outputStream = new FileOutputStream(resultFile)) {
//            byteArrayOutputStream.writeTo(outputStream);
//        }
//        System.out.println("Find your pdf file here " + resultFile.getAbsolutePath());
//        System.out.println(resultFile);


        HttpSession httpSession = request.getSession(false);
        try {
            ByteArrayOutputStream byteArrayOutputStream = documentCreation.createDocument(id);
            response.addHeader("Content-type","application/force-download");
            response.addHeader("Content-Disposition","attachment; filename=saskaita.pdf");
            response.getOutputStream().write(byteArrayOutputStream.toByteArray());
        }catch (Exception e){
            e.printStackTrace();
        }

    }

}
