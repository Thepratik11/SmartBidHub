package com.bidbridge.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class VendorProfileRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Contact number must be exactly 10 digits")
    private String contactNumber;

    @NotBlank(message = "Address is required")
    @Size(max = 255, message = "Address is too long")
    private String address;
}