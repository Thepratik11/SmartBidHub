package com.bidbridge.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BuyerProfileResponse {
    
	private Long buyerProfileId;
    private String name;
    private String email;
    private String organizationName;
}