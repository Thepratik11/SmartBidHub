package com.smartbidhub.smartbidhub.notification.Service;

import com.smartbidhub.smartbidhub.notification.dto.NotificationRequest;

public interface NotificationService {

    void sendEmail(NotificationRequest request);

}