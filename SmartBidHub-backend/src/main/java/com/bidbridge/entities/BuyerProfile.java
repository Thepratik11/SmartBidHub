package com.bidbridge.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "buyer_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BuyerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buyerProfileId;
    
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonIgnoreProperties("buyerProfile")
    private User user;

    @Column(nullable = false)
    private String organizationName;

    private String department;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrganizationType organizationType;

    private String contactPhone;
}