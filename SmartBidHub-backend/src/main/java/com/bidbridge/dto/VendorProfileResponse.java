package com.bidbridge.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendorProfileResponse {
    private Long vendorProfileId;
    private String name;
    private String email;
    private String companyName;
    private Double rating;
}