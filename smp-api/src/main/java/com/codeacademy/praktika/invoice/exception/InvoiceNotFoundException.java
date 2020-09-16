package com.codeacademy.praktika.invoice.exception;

public class InvoiceNotFoundException extends RuntimeException{
    public InvoiceNotFoundException(String message) {
        super(message);
    }
}
