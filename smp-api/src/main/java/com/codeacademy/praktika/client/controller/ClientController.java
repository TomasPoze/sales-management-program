package com.codeacademy.praktika.client.controller;

import com.codeacademy.praktika.client.entity.Client;
import com.codeacademy.praktika.client.service.ClientService;
import com.codeacademy.praktika.user.entity.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/clients")
    public List<Client> getClients(){
        return clientService.getClients();
    }

    @GetMapping
    public Client getClient(@AuthenticationPrincipal User user) {
        Client client;
        try {
            client = clientService.findClientById(user.getClient().getId());
        }catch (NullPointerException e){
            return null;
        }
        return client;

    }

    @PostMapping("/info")
    @PreAuthorize("hasRole('CLIENT')")
    public Client updateClientInfo(
            @RequestParam(name = "email") String email,
            @RequestParam(name = "title") String title,
            @RequestParam(name = "address") String address,
            @RequestParam(name = "code") String code,
            @RequestParam(name = "bank_acc_nr") String bankAccountNumber,
            @AuthenticationPrincipal User user
    ) {
        Client client = clientService.findClientById(user.getClient().getId());
        client.setAddress(address);
        client.setBankAccountNumber(bankAccountNumber);
        client.setCode(code);
        client.setTitle(title);
        client.setEmail(email);

        return clientService.updateClientInfo(client);
    }
}
