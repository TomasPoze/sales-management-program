package com.codeacademy.praktika.order.service;

import com.codeacademy.praktika.client.repository.ClientRepository;
import com.codeacademy.praktika.exception.ClientNotFoundException;
import com.codeacademy.praktika.order.dto.OrderRequest;
import com.codeacademy.praktika.order.entity.Order;
import com.codeacademy.praktika.order.entity.OrderProduct;
import com.codeacademy.praktika.order.entity.OrderStatus;
import com.codeacademy.praktika.order.exception.OrderNotFoundException;
import com.codeacademy.praktika.order.exception.OrderProductNotFoundException;
import com.codeacademy.praktika.order.repository.OrderProductRepository;
import com.codeacademy.praktika.order.repository.OrderRepository;
import com.codeacademy.praktika.product.entity.Product;
import com.codeacademy.praktika.product.exception.ProductNotFoundException;
import com.codeacademy.praktika.product.repository.ProductRepository;
import com.codeacademy.praktika.product.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;
    private final ClientRepository clientRepository;
    private final ProductRepository productRepository;
    private final EntityManager em;

    public OrderService(OrderRepository orderRepository, OrderProductRepository orderProductRepository, ClientRepository clientRepository, ProductRepository productRepository, EntityManager em) {
        this.orderRepository = orderRepository;
        this.orderProductRepository = orderProductRepository;
        this.clientRepository = clientRepository;
        this.productRepository = productRepository;
        this.em = em;
    }

    @Transactional
    public Order createNewOrder(OrderRequest orderRequest) {
        Order order = new Order();

        LocalDateTime localDateTime = LocalDateTime.now();

        order.setClient(clientRepository.findById(orderRequest.getClientId()).orElseThrow());

        em.persist(order);

        order.generateOrderNumber(order);
        order.setLocalDateTime(localDateTime);
        order.setOrderStatus(OrderStatus.NAUJAS);
        order.setOrderItems(createOrderProduct(orderRequest.getItems(), order));

        return order;
    }


    private List<OrderProduct> createOrderProduct(List<OrderRequest.Item> requestProductList, Order order) {
        var list = requestProductList.stream()
                .map(r -> {
                    Product product = em.getReference(Product.class, r.getProductId());

                    OrderProduct orderProduct = new OrderProduct();

                    orderProduct.setQuantity(r.getQuantity());
                    orderProduct.setPricePerUnit(product.getPrice());
                    orderProduct.setOrder(order);
                    orderProduct.recalculateTotalPrice();
                    orderProduct.setProduct(product);
                    order.recalculateTotalSum();
                    order.addItem(orderProduct);
                    return orderProduct;
                })
                .collect(Collectors.toList());
        list.forEach(em::persist);
        return list;
    }


    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order was not found by this: " + id + " id! "));

    }

    public Order getOrderByClientId(Long id) {
        return orderRepository.getOrderByClientId(id);
    }

    public void deleteOrderById(Long id) {
        orderProductRepository.deleteByOrderId(id);
        orderRepository.deleteById(id);
    }

    public Order updateOrder(Long id, OrderStatus orderStatus, Long clientId) {
        try {
            Order order = getOrderById(id);
            if (order.getOrderStatus().equals(OrderStatus.NAUJAS)) {
                order.setClient(clientRepository.findById(clientId).orElseThrow(() -> new ClientNotFoundException("Client not found by this: " + id + " id.")));
            }
            order.setOrderStatus(orderStatus);
            return orderRepository.save(order);
        } catch (ProductNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public OrderProduct updateOrderProduct(Long id, BigDecimal quantity, Long productId) {
        OrderProduct orderProduct = orderProductRepository.findById(id).orElseThrow(() -> new OrderProductNotFoundException("Order Product was not found by this: " + id + " id."));
        Order order = getOrderById(orderProduct.getOrder().getId());
        try {
            if (order.getOrderStatus().equals(OrderStatus.NAUJAS)) {
                orderProduct.setQuantity(quantity);
                orderProduct.setProduct(productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException("Product not found by this: " + id + " id.")));
                orderProduct.recalculateTotalPrice();
                order.recalculateTotalSum();
                return orderProductRepository.save(orderProduct);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public void deleteOrderProductById(Long id) {
        OrderProduct orderProduct = getOrderProductById(id);
        Order order = getOrderById(orderProduct.getOrder().getId());
        orderProductRepository.deleteById(id);
        order.recalculateTotalSum();
        orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<OrderProduct> getOrderProducts(Long id) {
        return orderProductRepository.findAllByOrderId(id);
    }

    public OrderProduct getOrderProductById(Long id) {
        return orderProductRepository.findById(id)
                .orElseThrow(() -> new OrderProductNotFoundException("Order Product not found by this: " + id + " id."));
    }

    public List<Order> getClientOrders(Long id) {
        return orderRepository.findOrderByClientId(id);
    }

    public OrderProduct addOrderProduct(Long id, BigDecimal quantity, Long productId) {
        try {
            Order order = getOrderById(id);
            if (order.getOrderStatus().equals(OrderStatus.NAUJAS)) {
                OrderProduct orderProduct = new OrderProduct();
                orderProduct.setQuantity(quantity);
                orderProduct.setProduct(productRepository.findById(productId).orElseThrow(() -> new ProductNotFoundException("Product with this: " + id + " was not found!")));
                orderProduct.setPricePerUnit(orderProduct.getProduct().getPrice());
                orderProduct.recalculateTotalPrice();

                order.addItem(orderProduct);
                order.recalculateTotalSum();
                return orderProductRepository.save(orderProduct);
            }
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        return null;
    }
}
