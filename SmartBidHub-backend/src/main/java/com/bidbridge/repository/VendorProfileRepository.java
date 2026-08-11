package com.bidbridge.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.bidbridge.entities.ApprovalStatus;
import com.bidbridge.entities.User;
import com.bidbridge.entities.VendorProfile;

import java.util.List;
import java.util.Optional;

public interface VendorProfileRepository extends JpaRepository<VendorProfile, Long> {

    Optional<VendorProfile> findByUser(User user);

    boolean existsByUser(User user);
    Optional<VendorProfile> findByUser_UserId(Long userId);
    
    List<VendorProfile> findByApprovalStatus(ApprovalStatus approvalStatus);
}
