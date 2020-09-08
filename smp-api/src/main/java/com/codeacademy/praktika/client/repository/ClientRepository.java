package com.codeacademy.praktika.client.repository;

import com.codeacademy.praktika.client.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client,Long> {
}
