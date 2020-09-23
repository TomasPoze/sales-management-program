package com.codeacademy.praktika.email.service;

import com.codeacademy.praktika.email.dto.EmailMessage;
import com.codeacademy.praktika.email.integration.EmailIntegration;
import com.codeacademy.praktika.email.integration.OtherMailServiceIntegration;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private EmailIntegration emailIntegration;

    public EmailService(@Qualifier(OtherMailServiceIntegration.QUALIFIER) EmailIntegration emailIntegration){
        this.emailIntegration = emailIntegration;
    }

    public void send(EmailMessage message){
        emailIntegration.sendMail(message);
    }
}
