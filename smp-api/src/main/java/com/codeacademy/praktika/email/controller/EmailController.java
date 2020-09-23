package com.codeacademy.praktika.email.controller;

import com.codeacademy.praktika.email.dto.EmailMessage;
import com.codeacademy.praktika.email.service.EmailService;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.codeacademy.praktika.email.integration.MailgunIntegration.sendSimpleMessage;


@RestController
@RequestMapping("/email")
public class EmailController {
    private EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/test")
    public void test() throws UnirestException {
        EmailMessage message = new EmailMessage();
        message.setUserEmail("ltuskeiteriai@gmail.com");
        message.setMessage("Heloo");

        JsonNode jsonNode = sendSimpleMessage();
        System.out.println(jsonNode.toString());
        emailService.send(message);
    }

}
