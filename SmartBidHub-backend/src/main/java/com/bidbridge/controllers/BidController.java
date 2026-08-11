package com.bidbridge.controllers;

import com.bidbridge.dto.BidRequest;
import com.bidbridge.dto.BidResponse;
import com.bidbridge.entities.Bid;
import com.bidbridge.service.BidService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bids")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PATCH, RequestMethod.OPTIONS})
public class BidController {

    private final BidService bidService;

//    @PostMapping("/tender/{tenderId}/vendor/{vendorId}")
//    public ResponseEntity<BidResponse> submitBid(
//            @PathVariable Long tenderId, 
//            @PathVariable Long vendorId, 
//            @Valid @RequestBody BidRequest req) {
//        
//        Bid bid = new Bid();
//        bid.setBidAmount(req.getBidAmount());
//        bid.setProposalDocument(req.getProposalDocument());
//            
//        Bid saved = bidService.submitBid(tenderId, vendorId, bid);
//        
//        // Updated to match your @AllArgsConstructor BidResponse(Long, String, Double, BidStatus, LocalDateTime)
//        BidResponse resp = new BidResponse(
//            saved.getBidId(),
//            saved.getTender().getTitle(), // Mapping Tender Title
//            saved.getBidAmount(),
//            saved.getStatus(),
//            saved.getSubmittedAt()
//        );
//
//        return new ResponseEntity<>(resp, HttpStatus.CREATED);
//    }
    @PostMapping
    public ResponseEntity<BidResponse> submitBid(@Valid @RequestBody BidRequest req) {
        
        Bid bid = new Bid();
        bid.setBidAmount(req.getBidAmount());
        bid.setProposalDocument(req.getProposalDocument());
            
        Bid saved = bidService.submitBid(req.getTenderId(), req.getVendorProfileId(), bid);
        
        // Updated to match the 6-argument constructor in your DTO:
        // Order: bidId, vendorCompanyName, tenderTitle, bidAmount, status, submittedAt
        BidResponse resp = new BidResponse(
            saved.getBidId(),
            saved.getVendorProfile().getCompanyName(), // 1. Added Vendor Company Name
            saved.getTender().getTitle(),               // 2. Tender Title
            saved.getBidAmount(),                        // 3. Amount
            saved.getStatus(),                           // 4. Status (Enum)
            saved.getSubmittedAt()                       // 5. Timestamp
        );

        return new ResponseEntity<>(resp, HttpStatus.CREATED);
    }
 // Inside BidController.java
    @GetMapping("/tender/{tenderId}")
    public ResponseEntity<List<BidResponse>> getBidsForTender(@PathVariable Long tenderId) {
        List<Bid> bids = bidService.getBidsForTender(tenderId);
        
        List<BidResponse> response = bids.stream().map(bid -> new BidResponse(
            bid.getBidId(),                               // Long
            bid.getVendorProfile().getCompanyName(),      // String
            bid.getTender().getTitle(),                   // String
            bid.getBidAmount(),                           // Double
            bid.getStatus(),                              // BidStatus (Enum)
            bid.getSubmittedAt()                          // LocalDateTime
        )).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
    @PatchMapping("/{bidId}/accept")
    public ResponseEntity<String> acceptBid(@PathVariable Long bidId) {
        bidService.acceptBid(bidId);
        return ResponseEntity.ok("Bid accepted and tender finalized.");
    }
    
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<BidResponse>> getBidsByVendor(@PathVariable Long vendorId) {
        List<Bid> bids = bidService.getBidsByVendorId(vendorId);
        
        List<BidResponse> response = bids.stream().map(bid -> new BidResponse(
            bid.getBidId(),
            (bid.getVendorProfile() != null) ? bid.getVendorProfile().getCompanyName() : "N/A",
            (bid.getTender() != null) ? bid.getTender().getTitle() : "N/A",
            bid.getBidAmount(),
            bid.getStatus(), // Pass the Enum directly, NOT .toString()
            bid.getSubmittedAt()
        )).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
    
    
    
}