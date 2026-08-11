package com.bidbridge.controllers;


import com.bidbridge.dto.VendorProfileResponse;
import com.bidbridge.dto.VendorRegistrationRequest;
import com.bidbridge.dto.VendorUpdateDTO;
import com.bidbridge.entities.User;
import com.bidbridge.entities.VendorProfile;
import com.bidbridge.service.VendorProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vendors")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class VendorController {

    private final VendorProfileService vendorService;

    @PostMapping("/register")
    public ResponseEntity<VendorProfileResponse> register(@Valid @RequestBody VendorRegistrationRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());

        VendorProfile profile = new VendorProfile();
        profile.setCompanyName(request.getCompanyName());
        profile.setGstNumber(request.getGstNumber());
        profile.setAddress(request.getAddress());
        profile.setUser(user);

        VendorProfile saved = vendorService.registerVendor(profile, request.getPassword());

        VendorProfileResponse response = new VendorProfileResponse(
            saved.getVendorProfileId(),
            saved.getUser().getName(),
            saved.getUser().getEmail(),
            saved.getCompanyName(),
            saved.getRating()
        );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @GetMapping("/{vendorId}")
    public ResponseEntity<VendorUpdateDTO> getProfile(@PathVariable Long vendorId) {
        VendorProfile profile = vendorService.getVendorById(vendorId);
        
        // Create the DTO manually to avoid any recursion or proxy issues
        VendorUpdateDTO dto = new VendorUpdateDTO();
        dto.setName(profile.getUser().getName());
        dto.setEmail(profile.getUser().getEmail());
        dto.setCompanyName(profile.getCompanyName());
        dto.setGstNumber(profile.getGstNumber());
        dto.setAddress(profile.getAddress());
        
        return ResponseEntity.ok(dto);
    }
    @PutMapping("/{vendorId}/profile")
    public ResponseEntity<VendorProfile> updateVendorProfile(
            @PathVariable Long vendorId,
            @Valid @RequestBody VendorUpdateDTO dto) {
        return ResponseEntity.ok(vendorService.updateProfile(vendorId, dto));
    }
    
}