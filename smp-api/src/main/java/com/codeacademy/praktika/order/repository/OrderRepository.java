package com.codeacademy.praktika.order.repository;

import com.codeacademy.praktika.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {

    Order getOrderByClientId(Long id);

    List<Order> findOrderByClientId(Long id);
}
