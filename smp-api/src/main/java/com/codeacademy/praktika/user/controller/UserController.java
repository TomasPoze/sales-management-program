package com.codeacademy.praktika.user.controller;


import com.codeacademy.praktika.user.dto.UserDto;
import com.codeacademy.praktika.user.entity.User;
import com.codeacademy.praktika.user.services.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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

        return userService.createOrUpdateUser(user);
    }
}
