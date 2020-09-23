package com.codeacademy.praktika.email.integration;

import com.codeacademy.praktika.email.dto.EmailMessage;

public interface EmailIntegration {
    void sendMail(EmailMessage emailMessage);
}
