package com.bidbridge.service;

import java.util.List;

import com.bidbridge.dto.VendorProfileRequest;
import com.bidbridge.dto.VendorUpdateDTO;
import com.bidbridge.entities.VendorProfile;

public interface VendorProfileService {

    VendorProfile registerVendor(VendorProfile vendorProfile, String rawPassword);
    VendorProfile getProfileByUserId(Long userId);
//     VendorProfile updateVendor(Long vendorId, VendorProfileRequest req);
    public VendorProfile updateProfile(Long vendorId, VendorUpdateDTO dto);
    VendorProfile getVendorById(Long vendorId); 
    
    List<VendorProfile> getPendingVendors();

    VendorProfile approveVendor(Long vendorId);

    VendorProfile rejectVendor(Long vendorId);
    
}
