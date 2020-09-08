package com.codeacademy.praktika.client.service;

import com.codeacademy.praktika.client.entity.Client;
import com.codeacademy.praktika.client.repository.ClientRepository;
import com.codeacademy.praktika.exception.ClientNotFoundException;
import com.codeacademy.praktika.user.entity.User;
import org.springframework.stereotype.Service;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }


    public Client createClient(){
        Client client = new Client();
        client.setTitle("");
        client.setEmail("");
        client.setCode("");
        client.setBankAccountNumber("");
        client.setAddress("");
        clientRepository.save(client);
        return client;
    }

    public Client updateClientInfo(Client client) {
        return clientRepository.save(client);
    }

    public Client findClientById(Long id){
        return clientRepository.findById(id)
                .orElseThrow(() -> new ClientNotFoundException("Client with: " + id + " id does not exist!"));
    }
}
