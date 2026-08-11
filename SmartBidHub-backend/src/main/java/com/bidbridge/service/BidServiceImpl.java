package com.bidbridge.service;

import com.bidbridge.custom_exceptions.DuplicateResourceException;
import com.bidbridge.custom_exceptions.InvalidOperationException;
import com.bidbridge.custom_exceptions.ResourceNotFoundException;
import com.bidbridge.entities.Bid;
import com.bidbridge.entities.BidStatus;
import com.bidbridge.entities.Tender;
import com.bidbridge.entities.TenderStatus;
import com.bidbridge.entities.VendorProfile;
import com.bidbridge.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BidServiceImpl implements BidService {

    private final BidRepository bidRepository;
    private final TenderRepository tenderRepository;
    private final VendorProfileRepository vendorProfileRepository;
    
    @Override
    public Bid submitBid(Long tenderId, Long vendorProfileId, Bid bid) {
        // 1. Fetch Tender
        Tender tender = tenderRepository.findById(tenderId)
                .orElseThrow(() -> new ResourceNotFoundException("Tender not found"));

        // 2. Business Rule: Cannot bid after end date
        if (LocalDateTime.now().isAfter(tender.getEndDate())) {
            throw new InvalidOperationException("Tender is closed for bidding");
        }

        // 3. Business Rule: Bid amount cannot exceed Tender's Max Budget
        if (bid.getBidAmount() > tender.getBudgetMax()) {
            throw new InvalidOperationException("Bid amount exceeds the maximum allowed budget of ₹" + tender.getBudgetMax());
        }

        // 4. Fetch Vendor
        VendorProfile vendorProfile = vendorProfileRepository.findById(vendorProfileId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor profile not found"));
        
        // 5. Duplicate Check: Prevent the SAME vendor from bidding on the SAME tender twice
        // This allows OTHER vendors to still place their bids
        bidRepository.findByTenderAndVendorProfile(tender, vendorProfile)
                .ifPresent(existing -> {
                    throw new DuplicateResourceException("You have already submitted a bid for this tender");
                });

        // 6. Set Fields & Save
        bid.setTender(tender);
        bid.setVendorProfile(vendorProfile);
        bid.setStatus(BidStatus.SUBMITTED);
        bid.setSubmittedAt(LocalDateTime.now());

        return bidRepository.save(bid);
    }
    
    @Override
    public List<Bid> getBidsForTender(Long tenderId) {
        Tender tender = tenderRepository.findById(tenderId)
                .orElseThrow(() -> new ResourceNotFoundException("Tender not found"));

        // Bidding Rule: Buyer can see bids ONLY after tender end date
        if (LocalDateTime.now().isBefore(tender.getEndDate())) {
            throw new InvalidOperationException("Bids are sealed until tender end date: " + tender.getEndDate());
        }
       
        return bidRepository.findByTender(tender);
    }

    @Override
    public List<Bid> getBidsByVendor(Long vendorProfileId) {
        VendorProfile vendorProfile = vendorProfileRepository.findById(vendorProfileId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor profile not found"));

        return bidRepository.findByVendorProfile(vendorProfile);
    }
    
    @Override
    public List<Bid> getBidsByTenderId(Long tenderId) {
        // This is usually for internal system checks or admin views
        return bidRepository.findByTender_TenderId(tenderId);
    }
   
    @Override
    public List<Bid> getBidsByVendorId(Long vendorId) {
        // Fetches bids for a specific vendor's history tab
        return bidRepository.findByVendorProfile_VendorProfileId(vendorId);
    }
    @Override
    @Transactional
    public void acceptBid(Long bidId) {
        // 1. Find the winning bid
        Bid winningBid = bidRepository.findById(bidId)
                .orElseThrow(() -> new ResourceNotFoundException("Bid not found"));

        Tender tender = winningBid.getTender();

        // 2. Fetch all bids for this tender
        List<Bid> allBids = bidRepository.findByTender(tender);

        // 3. Update statuses
        for (Bid bid : allBids) {
            if (bid.getBidId().equals(bidId)) {
                bid.setStatus(BidStatus.WON);
            } else {
                bid.setStatus(BidStatus.LOST);
            }
        }
        
        // 4. Update Tender status to CLOSED
        tender.setStatus(TenderStatus.CLOSED);
        
        bidRepository.saveAll(allBids);
        tenderRepository.save(tender);
    }
    @Override
    public List<Bid> getAllBids() {
        // This fetches every single bid across all tenders and vendors
        return bidRepository.findAll();
    }
}