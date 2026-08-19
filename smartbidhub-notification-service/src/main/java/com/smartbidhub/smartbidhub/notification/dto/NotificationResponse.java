package com.smartbidhub.smartbidhub.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class NotificationResponse {

    private boolean success;
    private String message;
    private LocalDateTime timestamp;

}