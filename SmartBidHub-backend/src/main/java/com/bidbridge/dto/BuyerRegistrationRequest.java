package com.bidbridge.dto;

import com.bidbridge.entities.OrganizationType;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class BuyerRegistrationRequest {
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @Size(min = 8, message = "Password must be at least 8 characters")
    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Organization name is required")
    private String organizationName;

    private String department;

    @NotNull(message = "Organization type is required")
    private OrganizationType organizationType;

    @Pattern(regexp = "^\\d{10}$", message = "Phone must be 10 digits")
    private String contactPhone;
}