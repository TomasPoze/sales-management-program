package com.codeacademy.praktika.order.dto;

import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class OrderRequest {
    private Long clientId;
    private List<Item> items = new ArrayList<>();


    @Getter
    @Setter
    public static class Item {
        private Long productId;
        private BigDecimal quantity;

    }

}
