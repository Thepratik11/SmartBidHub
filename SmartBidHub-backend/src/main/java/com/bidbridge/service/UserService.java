package com.bidbridge.service;

import com.bidbridge.entities.User;
import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    void deleteUser(Long userId);
    // ... other methods
}