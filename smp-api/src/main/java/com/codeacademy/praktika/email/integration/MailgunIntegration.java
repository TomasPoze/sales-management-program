package com.codeacademy.praktika.email.integration;

import com.codeacademy.praktika.email.dto.EmailMessage;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component(MailgunIntegration.QUALIFIER)
public class MailgunIntegration implements EmailIntegration{
    public static final String QUALIFIER = "mailgun-integration";
    private static final String YOUR_DOMAIN_NAME = "sandbox9f78ed6ece8d49f089b53df69c2561bc.mailgun.org";
    private static final String API_KEY = "04a17bdf7f79f8f326f2e1db66b9c76b-d5e69b0b-f4baf75b";

    @Override
    public void sendMail(EmailMessage emailMessage){
        log.info("Sending via MAILGUN");
    }

    public static JsonNode sendSimpleMessage() throws UnirestException {
        HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + YOUR_DOMAIN_NAME + "/messages")
			.basicAuth("api", API_KEY)
                .queryString("from", "Saskaitos faktura botas@gmail.com")
                .queryString("to", "ltuskeiteriai@gmail.com")
                .queryString("subject", "SASKAITOS FAKTURA")
                .queryString("text", "Jusu uzsakymo saskaitos faktura")
                .asJson();
        return request.getBody();
    }
}
