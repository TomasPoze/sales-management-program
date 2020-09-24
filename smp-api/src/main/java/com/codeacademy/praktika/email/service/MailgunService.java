package com.codeacademy.praktika.email.service;


import com.codeacademy.praktika.email.MailgunApiKey;
import com.codeacademy.praktika.order.service.OrderService;
import com.codeacademy.praktika.pdf.service.DocumentCreation;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.extern.slf4j.Slf4j;


import org.springframework.stereotype.Component;

import java.io.*;

@Slf4j
@Component(MailgunService.QUALIFIER)
public class MailgunService {

    private final OrderService orderService;
    private final DocumentCreation documentCreation;
    private static final MailgunApiKey mailgunApiKey = new MailgunApiKey();

    public static final String QUALIFIER = "mailgun-integration";
    private static final String YOUR_DOMAIN_NAME = "sandbox5ca5b40802614977a6d285a52f3c5abf.mailgun.org";

    public MailgunService(OrderService orderService, DocumentCreation documentCreation) {
        this.orderService = orderService;
        this.documentCreation = documentCreation;

    }

    public JsonNode sendSimpleMessage(Long id) throws UnirestException, IOException {

        File resultFile = File.createTempFile("saskaita", ".pdf");

        ByteArrayOutputStream byteArrayOutputStream = documentCreation.createDocument(id);

        try (OutputStream outputStream = new FileOutputStream(resultFile)) {
            byteArrayOutputStream.writeTo(outputStream);
        }

        HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/messages")
                .basicAuth("api", mailgunApiKey.getAPI_KEY())
                .queryString("from", "Saskaitos faktura botas@gmail.com")
                .queryString("to", orderService.getOrderById(id).getClient().getEmail())
                .queryString("subject", "SASKAITOS FAKTURA")
                .queryString("text", "Jusu uzsakymo saskaitos faktura")
                .field("attachment", new File(resultFile.getAbsolutePath()))
                .asJson();

        resultFile.deleteOnExit();

        return request.getBody();
    }
}
