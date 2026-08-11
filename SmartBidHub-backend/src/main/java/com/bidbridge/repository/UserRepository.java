package com.bidbridge.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.bidbridge.entities.Role;
import com.bidbridge.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
    List<User> findByRole(Role role);
}
