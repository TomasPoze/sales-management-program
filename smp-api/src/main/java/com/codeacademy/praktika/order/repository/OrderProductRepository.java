package com.codeacademy.praktika.order.repository;

import com.codeacademy.praktika.order.entity.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct,Long> {
    OrderProduct findByOrderId(Long id);

    @Transactional
    void deleteByOrderId(Long id);

    List<OrderProduct> findAllByOrderId(Long id);
}
