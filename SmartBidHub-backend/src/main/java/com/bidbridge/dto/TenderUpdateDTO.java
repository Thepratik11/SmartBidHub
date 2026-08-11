package com.bidbridge.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TenderUpdateDTO {
    private String title;
    private Long categoryId;
    private LocalDateTime endDate;
}
