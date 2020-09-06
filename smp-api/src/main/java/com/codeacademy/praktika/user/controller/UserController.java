package com.codeacademy.praktika.user.controller;


import com.codeacademy.praktika.user.dto.UserDto;
import com.codeacademy.praktika.user.entity.Role;
import com.codeacademy.praktika.user.entity.RoleName;
import com.codeacademy.praktika.user.entity.User;
import com.codeacademy.praktika.user.services.RoleService;
import com.codeacademy.praktika.user.services.UserService;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final RoleService roleService;

    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping
    public UserDto getUser(@AuthenticationPrincipal User user) {
        return new UserDto(user);
    }

    @PostMapping("/info")
    public User updateUserInfo(
            @RequestParam(name = "email") String email,
            @RequestParam(name = "name") String name,
            @RequestParam(name = "last_name") String lastName,
            @RequestParam(name = "password") String password,
            @AuthenticationPrincipal User user
    ) {
        user.setEmail(email);
        user.setName(name);
        user.setLastName(lastName);
        user.setPassword(password);

        return userService.UpdateUser(user);
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public void createUser(
            @RequestParam(name = "username") String username,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "email") String email,
            @RequestParam(name = "name") String name,
            @RequestParam(name = "last_name") String lastName,
            @RequestParam(name = "role") Set<RoleName> role
    ) {
        UserDto userDto = new UserDto();
        userDto.setUsername(username);
        userDto.setPassword(password);
        userDto.setEmail(email);
        userDto.setName(name);
        userDto.setLastName(lastName);
        userDto.setRoles(role);

        userService.createUser(userDto);
    }

    @PostMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
    public User updateOtherUserInfo(
            @PathVariable Long id,
            @RequestParam(name = "email") String email,
            @RequestParam(name = "username") String username,
            @RequestParam(name = "name") String name,
            @RequestParam(name = "last_name") String lastName,
            @RequestParam(name = "password") String password,
            @RequestParam(name = "role") Set<RoleName> roleName
    ) {
        Set<Role> role = roleService.findRoleByName(roleName);

        User user = userService.getUserById(id);
        user.setEmail(email);
        user.setUsername(username);
        user.setName(name);
        user.setLastName(lastName);
        user.setPassword(password);
        user.setRoles(role);

        return userService.UpdateUser(user);
    }

    @GetMapping("/{id}/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
    }
}
