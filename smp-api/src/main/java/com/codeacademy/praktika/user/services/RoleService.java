package com.codeacademy.praktika.user.services;

import com.codeacademy.praktika.user.entity.Role;
import com.codeacademy.praktika.user.entity.RoleName;
import com.codeacademy.praktika.user.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Set<Role> findRoleByName(Set<RoleName> role) {
        return roleRepository.findAllRoleByRoleIn(role);
    }


}
