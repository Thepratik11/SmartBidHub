package com.bidbridge.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class BidRequest {
    @NotNull(message = "Bid amount is required")
    @Positive(message = "Bid amount must be greater than zero")
    private Double bidAmount;

    @NotBlank(message = "Proposal link or text is required")
    private String proposalDocument;

    // Added to match your Frontend payload
    private String status; 
    private Long tenderId;
    private Long vendorProfileId;
}