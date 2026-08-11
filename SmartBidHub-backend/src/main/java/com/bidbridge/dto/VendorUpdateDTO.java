package com.bidbridge.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class VendorUpdateDTO {
    @NotBlank(message = "Name cannot be empty")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @Pattern(regexp = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$", 
             message = "Invalid GST format")
    private String gstNumber;

    private String address;
}