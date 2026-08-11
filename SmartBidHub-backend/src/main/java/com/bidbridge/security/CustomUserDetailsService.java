package com.bidbridge.security;

import com.bidbridge.entities.ApprovalStatus;
import com.bidbridge.entities.Role;
import com.bidbridge.entities.VendorProfile;
import com.bidbridge.repository.VendorProfileRepository;
import com.bidbridge.entities.User;
import com.bidbridge.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final VendorProfileRepository vendorProfileRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found")
                );
        
        if (user.getRole() == Role.VENDOR) {

            VendorProfile vendor = vendorProfileRepository
                    .findByUser_UserId(user.getUserId())
                    .orElseThrow(() ->
                            new UsernameNotFoundException("Vendor profile not found")
                    );

            if (vendor.getApprovalStatus() != ApprovalStatus.APPROVED) {
                throw new UsernameNotFoundException(
                        "Your account is waiting for admin approval."
                );
            }
        }

        return new CustomUserDetails(user);
    }
}
