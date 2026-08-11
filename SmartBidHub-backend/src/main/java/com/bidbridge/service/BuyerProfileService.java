package com.bidbridge.service;

import com.bidbridge.dto.BuyerUpdateDTO;
import com.bidbridge.entities.BuyerProfile;

public interface BuyerProfileService {

	BuyerProfile registerBuyer(BuyerProfile buyerProfile, String rawPassword);
	BuyerProfile getProfileByUserId(Long userId);
	BuyerProfile getBuyerById(Long buyerId);
	public BuyerProfile updateProfile(Long buyerId, BuyerUpdateDTO dto);
}