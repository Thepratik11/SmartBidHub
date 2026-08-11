package com.bidbridge.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminTenderDTO {
    private Long tenderId;
    private String title;
    private String categoryName;
    private String buyerOrganization;
    private String status;
    private LocalDateTime endDate;
}