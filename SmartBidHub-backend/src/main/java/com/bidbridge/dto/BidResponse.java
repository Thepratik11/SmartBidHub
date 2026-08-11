//package com.bidbridge.dto;
//
//import com.bidbridge.entities.BidStatus;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import java.time.LocalDateTime;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor // This solves: The constructor BidResponse(...) is undefined
//public class BidResponse {
//    private Long bidId;
//    private Long tenderId;
//    private String vendorCompanyName;
//    private Double bidAmount;
//    private BidStatus status;
//    private LocalDateTime submittedAt;
//}
package com.bidbridge.dto;

import com.bidbridge.entities.BidStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor // This creates the constructor with all 6 fields
public class BidResponse {
    private Long bidId;       
    private String vendorCompanyName; // Position 1
    private String tenderTitle;  // Position 2
    private Double bidAmount;    // Position 3
    private BidStatus status;    // Position 4
    private LocalDateTime submittedAt; // Position 5
}