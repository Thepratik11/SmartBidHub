package com.bidbridge.service;

import com.bidbridge.entities.Category;
import java.util.List;

public interface CategoryService {
    Category addCategory(Category category);
    List<Category> getAllCategories();
}