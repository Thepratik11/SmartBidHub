package com.smartbidhub.smartbidhub.notification.controller;

import java.time.LocalDateTime;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.smartbidhub.smartbidhub.notification.Service.NotificationService;
import com.smartbidhub.smartbidhub.notification.dto.NotificationRequest;
import com.smartbidhub.smartbidhub.notification.dto.NotificationResponse;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<NotificationResponse> sendEmail(
            @Valid @RequestBody NotificationRequest request) {

        notificationService.sendEmail(request);

        return ResponseEntity.ok(
                new NotificationResponse(
                        true,
                        "Email sent successfully",
                        LocalDateTime.now()
                )
        );
    }
    
    @GetMapping("/health")
    public String health() {
        return "Notification Service Running";
    }
}