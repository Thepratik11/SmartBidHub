package com.bidbridge.dto;

import com.bidbridge.entities.OrganizationType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BuyerUpdateDTO {
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Organization name is required")
    private String organizationName;

    private String department;

    @NotNull(message = "Organization type is required")
    private OrganizationType organizationType;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
    private String contactPhone;
}