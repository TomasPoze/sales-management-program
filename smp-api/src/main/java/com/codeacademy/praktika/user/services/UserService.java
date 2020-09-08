package com.codeacademy.praktika.user.services;

import com.codeacademy.praktika.client.entity.Client;
import com.codeacademy.praktika.client.repository.ClientRepository;
import com.codeacademy.praktika.client.service.ClientService;
import com.codeacademy.praktika.user.dto.UserDto;
import com.codeacademy.praktika.user.entity.Role;
import com.codeacademy.praktika.user.entity.User;
import com.codeacademy.praktika.user.exception.UserNotFoundException;
import com.codeacademy.praktika.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final ClientService clientService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleService roleService, ClientService clientService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
        this.clientService = clientService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("No user found by name: " + username));
    }

    public User UpdateUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void createUser(UserDto userDto) {
        Set<Role> role = roleService.findRoleByName(userDto.getRoles());
        if (userDto.getRoles().toString().equals("[CLIENT]")) {

            User user = User.builder()
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .username(userDto.getUsername())
                    .name(userDto.getName())
                    .lastName(userDto.getLastName())
                    .email(userDto.getEmail())
                    .roles(role)
                    .client(clientService.createClient())
                    .build();

            userRepository.save(user);
        } else {
            User user = User.builder()
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .username(userDto.getUsername())
                    .name(userDto.getName())
                    .lastName(userDto.getLastName())
                    .email(userDto.getEmail())
                    .roles(role)
                    .client(null)
                    .build();

            userRepository.save(user);
        }
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("No user was found by id: " + id));
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

}