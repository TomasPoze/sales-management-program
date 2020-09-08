package com.codeacademy.praktika.client.entity;

import com.codeacademy.praktika.user.entity.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;

import javax.persistence.*;


@Data
@Builder
@Entity
@Table(name = "Clients")
@ApiModel(value = "Client", description = "Client")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "code")
    private String code;

    @Column(name = "address")
    private String address;

    @Column(name = "bank_acc_nr", unique = true)
    private String bankAccountNumber;

    @Column(name = "email")
    private String email;

    @JsonIgnore
    @OneToOne(mappedBy = "client", cascade = CascadeType.ALL)
    private User user;

    @Tolerate
    public Client() {
    }
}
