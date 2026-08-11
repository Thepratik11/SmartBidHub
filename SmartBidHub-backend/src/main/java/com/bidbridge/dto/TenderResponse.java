package com.bidbridge.dto;

import com.bidbridge.entities.TenderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor // This solves: The constructor TenderResponse(...) is undefined
public class TenderResponse {
    private Long tenderId;
    private String title;
    private String categoryName;
    private String buyerOrganization;
    private TenderStatus status;
    private LocalDateTime endDate;
}