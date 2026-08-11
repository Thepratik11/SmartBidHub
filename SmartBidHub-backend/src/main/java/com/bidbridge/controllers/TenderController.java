//package com.bidbridge.controllers;
//
//import com.bidbridge.dto.TenderUpdateDTO;
//import com.bidbridge.entities.Tender;
//import com.bidbridge.service.TenderService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/tenders")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:5173")
//public class TenderController {
// 
//    private final TenderService tenderService;
//
//    // 1. For Vendors: See all active/open tenders
//    @GetMapping("/active")
//    public ResponseEntity<List<Tender>> getActiveTenders() {
//        return ResponseEntity.ok(tenderService.getAllOpenTenders());
//    }
//
//    // 2. Get specific tender details
//    @GetMapping("/{id}")
//    public ResponseEntity<Tender> getTenderById(@PathVariable Long id) {
//        return ResponseEntity.ok(tenderService.getTenderById(id));
//    }
//
//    // 3. For Admins: See everything
//    @GetMapping("/all")
//    public ResponseEntity<List<Tender>> getAllTenders() {
//        return ResponseEntity.ok(tenderService.getAllTenders());
//    }
////    @GetMapping("/buyers/tenders/{tenderId}")
////    public ResponseEntity<TenderUpdateDTO> getTenderForUpdate(@PathVariable Long tenderId) {
////        Tender tender = tenderService.getTenderById(tenderId);
////        
////        TenderUpdateDTO dto = new TenderUpdateDTO();
////        dto.setTitle(tender.getTitle());
////        dto.setCategoryId(tender.getCategory().getCategoryId());
////        dto.setEndDate(tender.getEndDate());
////        
////        return ResponseEntity.ok(dto);
////    }
//    @GetMapping("/buyers/tenders/{tenderId}")
//    public ResponseEntity<TenderUpdateDTO> getTenderForUpdate(@PathVariable Long tenderId) {
//        Tender tender = tenderService.getTenderById(tenderId);
//        
//        TenderUpdateDTO dto = new TenderUpdateDTO();
//        dto.setTitle(tender.getTitle());
//        
//        // Use null-safe check for category
//        if (tender.getCategory() != null) {
//            dto.setCategoryId(tender.getCategory().getCategoryId());
//        }
//        
//        dto.setEndDate(tender.getEndDate());
//        
//        return ResponseEntity.ok(dto);
//    }
//}

package com.bidbridge.controllers;

import com.bidbridge.dto.AdminTenderDTO;
import com.bidbridge.dto.TenderUpdateDTO;
import com.bidbridge.entities.Tender;
import com.bidbridge.service.TenderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api") 
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TenderController {
 
    private final TenderService tenderService;

    // 1. For Vendors: See all active/open tenders
    @GetMapping("/tenders/active")
    public ResponseEntity<List<Tender>> getActiveTenders() {
        return ResponseEntity.ok(tenderService.getAllOpenTenders());
    }

    // 2. Get specific tender details
    @GetMapping("/tenders/{id}")
    public ResponseEntity<Tender> getTenderById(@PathVariable Long id) {
        return ResponseEntity.ok(tenderService.getTenderById(id));
    }

    // 3. For Buyers: Get pre-filled DTO for update form
    @GetMapping("/buyers/tenders/{tenderId}")
    public ResponseEntity<TenderUpdateDTO> getTenderForUpdate(@PathVariable Long tenderId) {
        Tender tender = tenderService.getTenderById(tenderId);
        
        TenderUpdateDTO dto = new TenderUpdateDTO();
        dto.setTitle(tender.getTitle());
        
        if (tender.getCategory() != null) {
            dto.setCategoryId(tender.getCategory().getCategoryId());
        }
        
        dto.setEndDate(tender.getEndDate());
        
        return ResponseEntity.ok(dto);
    }
    @GetMapping("/all")
    public ResponseEntity<List<AdminTenderDTO>> getAllTenders() {
        List<Tender> tenders = tenderService.getAllTenders();
        
        // This manual mapping bypasses Jackson's automatic (and loop-prone) serialization
        List<AdminTenderDTO> dtos = tenders.stream().map(t -> {
            AdminTenderDTO dto = new AdminTenderDTO();
            dto.setTenderId(t.getTenderId());
            dto.setTitle(t.getTitle());
            dto.setStatus(t.getStatus() != null ? t.getStatus().toString() : "N/A");
            dto.setEndDate(t.getEndDate());
            
            // Null-safe access to relationships
            if (t.getCategory() != null) {
                dto.setCategoryName(t.getCategory().getName());
            }
            if (t.getBuyerProfile() != null) {
                dto.setBuyerOrganization(t.getBuyerProfile().getOrganizationName());
            }
            
            return dto;
        }).toList();

        return ResponseEntity.ok(dtos);
    }

    // 4. For Buyers: Update the tender details
    @PutMapping("/buyers/tenders/{tenderId}")
    public ResponseEntity<Tender> updateTender(
            @PathVariable Long tenderId, 
            @Valid @RequestBody TenderUpdateDTO dto) {
        return ResponseEntity.ok(tenderService.updateTender(tenderId, dto));
    }

    // REMOVED: getTendersByBuyer method because it conflicts with BuyerController
}