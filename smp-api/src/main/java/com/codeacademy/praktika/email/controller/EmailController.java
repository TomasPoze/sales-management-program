package com.codeacademy.praktika.email.controller;


import com.codeacademy.praktika.email.service.MailgunService;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
@RequestMapping("/email")
public class EmailController {
    private final MailgunService mailgunService;

    public EmailController(MailgunService mailgunService) {
        this.mailgunService = mailgunService;
    }

    @GetMapping("/{id}")
    public void sendPdf(@PathVariable Long id) throws UnirestException, IOException {
        mailgunService.sendSimpleMessage(id);
    }

}
