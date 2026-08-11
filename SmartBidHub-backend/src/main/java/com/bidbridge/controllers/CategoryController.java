package com.bidbridge.controllers;

import com.bidbridge.dto.CategoryResponse;
import com.bidbridge.entities.Category;
import com.bidbridge.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories") // Base path accessible to all roles
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", allowedHeaders = "*")
public class CategoryController {

    private final CategoryService categoryService;

    // Keep this for everyone
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<CategoryResponse> responses = categoryService.getAllCategories().stream()
                .map(cat -> new CategoryResponse(cat.getCategoryId(), cat.getName(), cat.getDescription()))
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(responses);
    }

    // Move the 'Admin only' logic to a specific sub-path or handle via SecurityConfig
    @PostMapping("/admin") 
    @PreAuthorize("hasRole('ADMIN')") // Only Admins can add
    public ResponseEntity<CategoryResponse> addCategory(@Valid @RequestBody CategoryResponse request) {
        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());

        Category saved = categoryService.addCategory(category);

        CategoryResponse response = new CategoryResponse(
                saved.getCategoryId(),
                saved.getName(),
                saved.getDescription()
        );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}