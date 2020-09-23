package com.codeacademy.praktika.email.integration;

import com.codeacademy.praktika.email.dto.EmailMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

@Slf4j
@Component(OtherMailServiceIntegration.QUALIFIER)
public class OtherMailServiceIntegration implements EmailIntegration{
    public static final String QUALIFIER = "other-mail-integration";

    @Override
    public void sendMail(EmailMessage emailMessage) {
        log.info("Sending via OTHER SERVICE");
    }

}
