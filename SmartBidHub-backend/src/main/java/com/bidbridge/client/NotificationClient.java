package com.bidbridge.client;


import com.bidbridge.dto.NotificationRequest;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
@Slf4j
public class NotificationClient {

    private final RestTemplate restTemplate;

    @Value("${notification.service.url}")
    private String notificationUrl;

    public void sendEmail(NotificationRequest request) {

        try {

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<NotificationRequest> entity =
                    new HttpEntity<>(request, headers);

            restTemplate.postForEntity(notificationUrl, entity, String.class);

            log.info("Notification sent successfully to {}", request.getTo());

        } catch (Exception e) {

            log.error("Notification Service unavailable : {}", e.getMessage());

        }
    }
}