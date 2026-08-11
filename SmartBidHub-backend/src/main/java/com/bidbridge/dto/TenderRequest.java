package com.bidbridge.dto;


import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TenderRequest {
    @NotBlank(message = "Title cannot be empty")
    private String title;

    @Size(max = 3000)
    private String description;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    @NotNull(message = "Buyer Profile ID is required")
    private Long buyerProfileId;

    @Positive(message = "Min budget must be positive")
    private Double budgetMin;

    @Positive(message = "Max budget must be positive")
    private Double budgetMax;

    @FutureOrPresent(message = "Start date cannot be in the past")
    private LocalDateTime startDate;

    @Future(message = "End date must be in the future")
    private LocalDateTime endDate;
}