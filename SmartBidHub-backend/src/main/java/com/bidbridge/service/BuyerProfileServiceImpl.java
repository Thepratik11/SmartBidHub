package com.bidbridge.service;


import com.bidbridge.custom_exceptions.DuplicateResourceException;
import com.bidbridge.custom_exceptions.ResourceNotFoundException;
import com.bidbridge.dto.BuyerUpdateDTO;
import com.bidbridge.entities.BuyerProfile;
import com.bidbridge.entities.Role;
import com.bidbridge.entities.User;
import com.bidbridge.repository.BuyerProfileRepository;
import com.bidbridge.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BuyerProfileServiceImpl implements BuyerProfileService {

    private final UserRepository userRepository;
    private final BuyerProfileRepository buyerProfileRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    @Transactional
    public BuyerProfile registerBuyer(
            BuyerProfile buyerProfile,
            String rawPassword
    ) {

        String email = buyerProfile.getUser().getEmail();

        // Duplicate email check
        if (userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException(
                    "User already exists with email: " + email
            );
        }
        
        // Create User
        User user = buyerProfile.getUser();
        user.setRole(Role.BUYER);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setActive(true);

        User savedUser = userRepository.save(user);

        // Link profile
        buyerProfile.setUser(savedUser);

        return buyerProfileRepository.save(buyerProfile);
    }
    @Override
    public BuyerProfile getProfileByUserId(Long userId) {
        return buyerProfileRepository.findByUser_UserId(userId)
               .orElseThrow(() -> new ResourceNotFoundException("Profile not found"));
    }
    @Override
    @Transactional
    public BuyerProfile updateProfile(Long buyerId, BuyerUpdateDTO dto) {
        BuyerProfile profile = buyerProfileRepository.findById(buyerId)
                .orElseThrow(() -> new ResourceNotFoundException("Buyer not found"));

        // 1. Update User Entity details
        User user = profile.getUser();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        // 2. Update BuyerProfile Entity details
        profile.setOrganizationName(dto.getOrganizationName());
        profile.setDepartment(dto.getDepartment());
        profile.setOrganizationType(dto.getOrganizationType());
        profile.setContactPhone(dto.getContactPhone());

        return buyerProfileRepository.save(profile);
    }
    @Override
    public BuyerProfile getBuyerById(Long buyerId) {
        return buyerProfileRepository.findById(buyerId)
                .orElseThrow(() -> new ResourceNotFoundException("Buyer Profile not found for ID: " + buyerId));
    }
}
