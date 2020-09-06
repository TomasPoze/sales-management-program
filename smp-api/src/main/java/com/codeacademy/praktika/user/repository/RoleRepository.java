package com.codeacademy.praktika.user.repository;

import com.codeacademy.praktika.user.entity.Role;
import com.codeacademy.praktika.user.entity.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Set<Role> findAllRoleByRoleIn(Set<RoleName> role);
}
