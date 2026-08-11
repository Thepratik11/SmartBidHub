package com.bidbridge.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(
    name = "bids",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"tender_id", "vendor_profile_id"}
    )
)
@Getter
@Setter	
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bidId;
    

    // Tender on which bid is placed
    @ManyToOne
    @JoinColumn(name = "tender_id", nullable = false)
    @JsonIgnoreProperties("bids")
    private Tender tender;

    // Vendor organization placing the bid
    @ManyToOne
    @JoinColumn(name = "vendor_profile_id", nullable = false)
    @JsonIgnoreProperties("bids")
    private VendorProfile vendorProfile;

    @Column(nullable = false)
    private Double bidAmount;

    @Column(length = 2000)
    private String proposalDocument; // path / URL / text (v1)

    @Enumerated(EnumType.STRING)
    private BidStatus status = BidStatus.SUBMITTED;

    private LocalDateTime submittedAt = LocalDateTime.now();
}
