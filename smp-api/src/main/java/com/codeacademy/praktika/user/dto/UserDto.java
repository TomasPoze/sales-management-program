package com.codeacademy.praktika.user.dto;

import com.codeacademy.praktika.user.entity.Role;
import com.codeacademy.praktika.user.entity.User;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class UserDto {
    private String name;
    private String lastName;
    private String username;
    private Set<String> roles;
    private String password;
    private String email;

    public UserDto(User user) {
        this.name = user.getName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.roles = user.getRoles().stream()
                .map(Role::getRole)
                .collect(Collectors.toSet());
    }
}
