package com.bidbridge.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.bidbridge.entities.BuyerProfile;
import com.bidbridge.entities.User;

import java.util.Optional;

public interface BuyerProfileRepository extends JpaRepository<BuyerProfile, Long> {

    Optional<BuyerProfile> findByUser(User user);

    boolean existsByUser(User user);
    Optional<BuyerProfile> findByUser_UserId(Long userId);
}