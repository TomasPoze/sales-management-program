package com.codeacademy.praktika.pdf.controller;

import com.codeacademy.praktika.pdf.service.DocumentCreation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Produces;

import java.io.*;

@RestController
@RequestMapping("/pdf")
public class PdfController {

    private final DocumentCreation documentCreation;

    public PdfController(DocumentCreation documentCreation) {
        this.documentCreation = documentCreation;
    }


    @GetMapping("/{id}")
    @Produces("application/pdf")
    public void createPdf(@PathVariable Long id, HttpServletRequest request, HttpServletResponse response) {

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
