package com.bidbridge.service;


import com.bidbridge.client.NotificationClient;
import com.bidbridge.dto.NotificationRequest;
import com.bidbridge.custom_exceptions.DuplicateResourceException;
import com.bidbridge.custom_exceptions.ResourceNotFoundException;
import com.bidbridge.dto.VendorProfileRequest;
import com.bidbridge.dto.VendorUpdateDTO;
import com.bidbridge.entities.ApprovalStatus;
import com.bidbridge.entities.Role;
import com.bidbridge.entities.User;
import com.bidbridge.entities.VendorProfile;
import com.bidbridge.repository.UserRepository;
import com.bidbridge.repository.VendorProfileRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class VendorProfileServiceImpl implements VendorProfileService {
	private final UserRepository userRepository;
    private final VendorProfileRepository vendorProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final NotificationClient notificationClient;
    

    @Override
   
    public VendorProfile registerVendor(
            VendorProfile vendorProfile,
            String rawPassword
    ) {

        String email = vendorProfile.getUser().getEmail();

        // Duplicate email check
        if (userRepository.existsByEmail(email)) {
            throw new DuplicateResourceException(
                    "User already exists with email: " + email
            );
        }

        // Create User
        User user = vendorProfile.getUser();
        user.setRole(Role.VENDOR);
        user.setPassword(passwordEncoder.encode(rawPassword));
        user.setActive(true);
        
        User savedUser = userRepository.save(user);

        // Link profile
        vendorProfile.setUser(savedUser);
        
        vendorProfile.setApprovalStatus(ApprovalStatus.PENDING);
         
        return vendorProfileRepository.save(vendorProfile);
    }
    @Override
    public VendorProfile getProfileByUserId(Long userId) {
        return vendorProfileRepository.findByUser_UserId(userId)
               .orElseThrow(() -> new ResourceNotFoundException("Vendor profile not found for user ID: " + userId));
    }
    @Override
    public VendorProfile getVendorById(Long vendorId) {
        return vendorProfileRepository.findById(vendorId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor Profile not found with ID: " + vendorId));
    }

    @Override
    @Transactional
    public VendorProfile updateProfile(Long vendorId, VendorUpdateDTO dto) {
        VendorProfile profile = getVendorById(vendorId); // Reuse the method above
        
        // Update User
        profile.getUser().setName(dto.getName());
        profile.getUser().setEmail(dto.getEmail());
        
        // Update Profile
        profile.setCompanyName(dto.getCompanyName());
        profile.setGstNumber(dto.getGstNumber());
        profile.setAddress(dto.getAddress());
        
        return vendorProfileRepository.save(profile);
    }
    
    @Override
    public List<VendorProfile> getPendingVendors() {
        return vendorProfileRepository.findByApprovalStatus(ApprovalStatus.PENDING);
    }
    
    @Override
    public VendorProfile approveVendor(Long vendorId) {

        VendorProfile vendor = vendorProfileRepository.findById(vendorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Vendor not found"));

        vendor.setApprovalStatus(ApprovalStatus.APPROVED);
        
        NotificationRequest request = new NotificationRequest();

        request.setTo(vendor.getUser().getEmail());
        request.setSubject("Vendor Registration Approved");
        request.setMessage(
                "Congratulations! Your SmartBidHub vendor account has been approved by the administrator. You can now log in and start bidding on tenders."
        );
        request.setNotificationType("VENDOR_APPROVED");

        notificationClient.sendEmail(request);

        return vendorProfileRepository.save(vendor);
    }
    
    @Override
    public VendorProfile rejectVendor(Long vendorId) {

        VendorProfile vendor = vendorProfileRepository.findById(vendorId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Vendor not found"));

        vendor.setApprovalStatus(ApprovalStatus.REJECTED);
        
        NotificationRequest request = new NotificationRequest();

        request.setTo(vendor.getUser().getEmail());
        request.setSubject("Vendor Registration Rejected");
        request.setMessage(
                "We regret to inform you that your SmartBidHub vendor registration request has been rejected. Please contact the administrator for more information."
        );
        request.setNotificationType("VENDOR_REJECTED");

        notificationClient.sendEmail(request);

        return vendorProfileRepository.save(vendor);
    }
}