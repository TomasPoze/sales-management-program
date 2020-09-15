package com.codeacademy.praktika.order.exception;

public class OrderProductNotFoundException extends RuntimeException{
    public OrderProductNotFoundException(String message) {
        super(message);
    }
}
