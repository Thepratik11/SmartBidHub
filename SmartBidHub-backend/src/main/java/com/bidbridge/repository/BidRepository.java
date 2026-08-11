package com.bidbridge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.bidbridge.entities.Bid;
import com.bidbridge.entities.Tender;
import com.bidbridge.entities.VendorProfile;

import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {

    // 1. For getBidsForTender (uses the whole Object)
    List<Bid> findByTender(Tender tender);

    // 2. For getBidsByVendor (uses the whole Object)
    List<Bid> findByVendorProfile(VendorProfile vendorProfile);

    // 3. For duplicate check in submitBid
    Optional<Bid> findByTenderAndVendorProfile(Tender tender, VendorProfile vendorProfile);

    // 4. For fetching by ID (used in Buyer Dashboard)
    List<Bid> findByTender_TenderId(Long tenderId);

    // 5. For fetching by Vendor ID (used in Vendor Dashboard)
    @Query("SELECT b FROM Bid b WHERE b.vendorProfile.vendorProfileId = :vendorId")
    List<Bid> findByVendorProfile_VendorProfileId(@Param("vendorId") Long vendorId);

    // 6. For deleting tenders safely
    @Modifying
    @Transactional
    @Query("DELETE FROM Bid b WHERE b.tender.tenderId = :tenderId")
    void deleteByTenderId(@Param("tenderId") Long tenderId);
}