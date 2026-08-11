package com.bidbridge.controllers;


import com.bidbridge.dto.BuyerProfileResponse;
import com.bidbridge.dto.BuyerRegistrationRequest;
import com.bidbridge.dto.BuyerUpdateDTO;
import com.bidbridge.dto.TenderRequest;
import com.bidbridge.dto.TenderResponse;
import com.bidbridge.entities.*;
import com.bidbridge.service.BuyerProfileService;
import com.bidbridge.service.TenderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/buyers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class BuyerController {
    private final BuyerProfileService buyerService;
    private final TenderService tenderService;

    @PostMapping("/register")
    public ResponseEntity<BuyerProfileResponse> register(@Valid @RequestBody BuyerRegistrationRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());

        BuyerProfile profile = new BuyerProfile();
        profile.setOrganizationName(request.getOrganizationName());
        profile.setDepartment(request.getDepartment());
        profile.setOrganizationType(request.getOrganizationType());
        profile.setContactPhone(request.getContactPhone());
        profile.setUser(user);

        BuyerProfile saved = buyerService.registerBuyer(profile, request.getPassword());

        // Using AllArgsConstructor
        BuyerProfileResponse resp = new BuyerProfileResponse(
            saved.getBuyerProfileId(),
            saved.getUser().getName(),
            saved.getUser().getEmail(),
            saved.getOrganizationName()
        );

        return new ResponseEntity<>(resp, HttpStatus.CREATED);
    }

    @PostMapping("/tenders")
    public ResponseEntity<TenderResponse> createTender(@Valid @RequestBody TenderRequest req) {
        Tender tender = new Tender();
        tender.setTitle(req.getTitle());
        tender.setDescription(req.getDescription());
        tender.setBudgetMin(req.getBudgetMin());
        tender.setBudgetMax(req.getBudgetMax());
        tender.setStartDate(req.getStartDate());
        tender.setEndDate(req.getEndDate());

        Category category = new Category();
        category.setCategoryId(req.getCategoryId());
        tender.setCategory(category);

        BuyerProfile buyer = new BuyerProfile();
        buyer.setBuyerProfileId(req.getBuyerProfileId());
        tender.setBuyerProfile(buyer);

        Tender saved = tenderService.createTender(tender);

        // This now works because of @AllArgsConstructor in TenderResponse
        TenderResponse resp = new TenderResponse(
            saved.getTenderId(),
            saved.getTitle(),
            saved.getCategory().getName(),
            saved.getBuyerProfile().getOrganizationName(),
            saved.getStatus(),
            saved.getEndDate()
        );

        return new ResponseEntity<>(resp, HttpStatus.CREATED);
    }
    @GetMapping("/{buyerId}/tenders")
    public ResponseEntity<List<TenderResponse>> getBuyerTenders(@PathVariable Long buyerId) {
//    	System.out.println("Principal: " + authentication.getPrincipal());
//        System.out.println("Authorities: " + authentication.getAuthorities());
        List<Tender> tenders = tenderService.getTendersByBuyerId(buyerId);
        
        List<TenderResponse> responses = tenders.stream()
            .map(t -> new TenderResponse(
                t.getTenderId(),
                t.getTitle(),
                t.getCategory().getName(),
                t.getBuyerProfile().getOrganizationName(),
                t.getStatus(),
                t.getEndDate()
            )).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }
    @DeleteMapping("/tenders/{tenderId}")
    public ResponseEntity<String> deleteTender(@PathVariable Long tenderId) {
        tenderService.deleteTender(tenderId);
        return ResponseEntity.ok("Tender and associated bids deleted successfully");
    }
    @GetMapping("/{buyerId}")
    public ResponseEntity<BuyerUpdateDTO> getProfile(@PathVariable Long buyerId) {
        BuyerProfile profile = buyerService.getBuyerById(buyerId);
        
        BuyerUpdateDTO dto = new BuyerUpdateDTO();
        dto.setName(profile.getUser().getName());
        dto.setEmail(profile.getUser().getEmail());
        dto.setOrganizationName(profile.getOrganizationName());
        dto.setDepartment(profile.getDepartment());
        dto.setOrganizationType(profile.getOrganizationType());
        dto.setContactPhone(profile.getContactPhone());
        
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{buyerId}/profile")
    public ResponseEntity<BuyerProfile> updateProfile(
            @PathVariable Long buyerId,
            @Valid @RequestBody BuyerUpdateDTO dto) {
        return ResponseEntity.ok(buyerService.updateProfile(buyerId, dto));
    }
    
}