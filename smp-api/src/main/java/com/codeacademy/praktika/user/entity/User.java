package com.codeacademy.praktika.user.entity;

import com.codeacademy.praktika.client.entity.Client;
import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.Tolerate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;


@Data
@Builder
@Entity
@Table(name = "Users")
@ApiModel(value = "User", description = "User")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "username", nullable = false, unique = true)
    @NotEmpty
    @Min(2)
    private String username;

    @JsonIgnore
    @Column(name = "password", nullable = false)
    @NotEmpty
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    @NotEmpty
    private String email;

    @Column(name = "name", nullable = false)
    @NotEmpty
    private String name;

    @Column(name = "last_name", nullable = false)
    @NotEmpty
    private String lastName;

    @ManyToMany(fetch = FetchType.EAGER)
    @NotEmpty
    @JoinTable(
            name = "users_roles",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    private Set<Role> roles ;

    @OneToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private Client client;

    @Tolerate
    public User() {
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getRole()))
                .collect(Collectors.toSet());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
