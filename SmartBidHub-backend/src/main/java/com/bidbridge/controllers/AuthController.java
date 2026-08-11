package com.bidbridge.controllers;


import com.bidbridge.dto.AuthResponse;
import com.bidbridge.dto.LoginRequest;
import com.bidbridge.security.CustomUserDetails;
import com.bidbridge.security.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    
    // 1. ADD THESE TWO LINES HERE
    private final com.bidbridge.service.BuyerProfileService buyerService;
    private final com.bidbridge.service.VendorProfileService vendorService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails.getUsername());
        String role = userDetails.getAuthorities().isEmpty() ? "" : 
                      userDetails.getAuthorities().iterator().next().getAuthority();

        Long profileId = null;
        Long userId = userDetails.getUser().getUserId();

        // 2. These will now work because the services are injected above
        if (role.equals("ROLE_BUYER")) {
            profileId = buyerService.getProfileByUserId(userId).getBuyerProfileId();
        } else if (role.equals("ROLE_VENDOR")) {
            profileId = vendorService.getProfileByUserId(userId).getVendorProfileId();
        }

        AuthResponse response = new AuthResponse(
                token,
                userDetails.getUsername(),
                role,
                profileId, 
                "Login successful"
        );

        return ResponseEntity.ok(response);
    }
}