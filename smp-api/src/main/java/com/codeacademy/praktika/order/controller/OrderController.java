package com.codeacademy.praktika.order.controller;


import com.codeacademy.praktika.order.dto.OrderRequest;
import com.codeacademy.praktika.order.entity.Order;
import com.codeacademy.praktika.order.entity.OrderProduct;
import com.codeacademy.praktika.order.entity.OrderStatus;
import com.codeacademy.praktika.order.service.OrderService;
import com.codeacademy.praktika.user.entity.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/orders/{id}")
    public List<Order> getClientOrders(@AuthenticationPrincipal User user) {
        return orderService.getClientOrders(user.getClient().getId());
    }

    @GetMapping("/products/{id}")
    public List<OrderProduct> getOrderProducts(@PathVariable Long id) {
        return orderService.getOrderProducts(id);
    }

    @GetMapping("/product/{id}")
    public OrderProduct getOrderProduct(@PathVariable Long id) {
        return orderService.getOrderProductById(id);
    }

    @PostMapping
    public Order createOrder(@AuthenticationPrincipal User user, @RequestBody OrderRequest orderRequest) {
        return orderService.createNewOrder(user, orderRequest);
    }

    @PostMapping("/add/{id}")
    public OrderProduct addOrderProduct(
            @PathVariable Long id,
            @RequestParam BigDecimal quantity,
            @RequestParam Long productId
    ) {
        return orderService.addOrderProduct(id, quantity, productId);
    }

    @PostMapping("/update/{id}")
    public Order updateClientOrder(
            @PathVariable Long id,
            @RequestParam OrderStatus orderStatus,
            @RequestParam Long clientId
    ) {
        return orderService.updateOrder(id, orderStatus, clientId);
    }

    @PostMapping("/update/product/{id}")
    public OrderProduct updateOrderProduct(
            @PathVariable Long id,
            @RequestParam BigDecimal quantity,
            @RequestParam Long productId
    ) {
        return orderService.updateOrderProduct(id, quantity, productId);
    }

    @PostMapping("/update/user/{id}")
    public Order updateAssignedWorker(@PathVariable Long id, @RequestParam Long userId){
        return orderService.updateAssignedWorker(id,userId);
    }

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/client/{id}")
    public Order getOrderByClientId(@PathVariable Long id) {
        return orderService.getOrderByClientId(id);
    }

    @GetMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public void deleteOrder(@PathVariable Long id) {
        orderService.deleteOrderById(id);
    }

    @GetMapping("/delete/item/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public void deleteOrderProduct(@PathVariable Long id) {
        orderService.deleteOrderProductById(id);
    }

}
