package com.bidbridge.config;

import com.bidbridge.entities.Role;
import com.bidbridge.entities.User;
import com.bidbridge.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if any admin exists to avoid duplicate entries
        if (!userRepository.existsByEmail("admin@bidbridge.com")) {
            
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail("admin@bidbridge.com");
            // VERY IMPORTANT: Encode the password before saving
            admin.setPassword(passwordEncoder.encode("admin123")); 
            admin.setRole(Role.ADMIN);
            admin.setActive(true);
            admin.setCreatedAt(LocalDateTime.now());

            userRepository.save(admin);
            System.out.println(">>> Initial Admin User Created: admin@bidbridge.com / admin123");
        }
    }
}