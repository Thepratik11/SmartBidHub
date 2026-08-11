package com.bidbridge.service;



import java.util.List;

import com.bidbridge.dto.TenderUpdateDTO;
import com.bidbridge.entities.Tender;


public interface TenderService {

    Tender createTender(Tender tender);

    List<Tender> getTendersByBuyer(Long buyerProfileId);

    List<Tender> getActiveTenders();
    
    List<Tender> getTendersByBuyerId(Long buyerProfileId);
    Tender getTenderById(Long tenderId);
    
    List<Tender> getAllOpenTenders();
//    Tender getTenderById(Long id);
    List<Tender> getAllTenders();
    Tender updateTender(Long tenderId, TenderUpdateDTO dto);
    
    Tender adminUpdateStatus(Long tenderId, String status);
    
    void deleteTender(Long tenderId);
}