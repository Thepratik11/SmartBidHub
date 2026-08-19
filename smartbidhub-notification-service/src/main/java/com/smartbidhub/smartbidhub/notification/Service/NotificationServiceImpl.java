package com.smartbidhub.smartbidhub.notification.Service;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.smartbidhub.smartbidhub.notification.dto.NotificationRequest;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

  
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    private final JavaMailSender mailSender;

    @Override
    public void sendEmail(NotificationRequest request) {

        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(fromEmail);
        message.setTo(request.getTo());
        message.setSubject(request.getSubject());
        message.setText(request.getMessage());

        try {

        	log.info("Notification Type : {}", request.getNotificationType());
            log.info("Sending email to: {}", request.getTo());

            mailSender.send(message);

            log.info("Email sent successfully to: {}", request.getTo());

        } catch (Exception e) {

            log.error("Failed to send email to: {}", request.getTo(), e);

            throw new RuntimeException("Unable to send email");
        }
    }
}