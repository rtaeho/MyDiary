package com.mydiary.controller;

import com.mydiary.dto.DiaryRequestDTO;
import com.mydiary.dto.DiaryResponseDTO;
import com.mydiary.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diaries")
public class DiaryController {

    @Autowired
    private DiaryService diaryService;

    @PostMapping
    public ResponseEntity<DiaryResponseDTO> createDiary(@RequestParam String date, @RequestBody DiaryRequestDTO diaryRequestDTO) {
        DiaryResponseDTO createdDiary = diaryService.createDiary(date, diaryRequestDTO);
        return ResponseEntity.ok(createdDiary);
    }

    @GetMapping
    public ResponseEntity<?> getDiary(@RequestParam(required = false) String date) {
        if (date != null) {
            DiaryResponseDTO diary = diaryService.getDiaryByDate(date);
            return diary != null ? ResponseEntity.ok(diary) : ResponseEntity.ok(null);
        } else {
            List<DiaryResponseDTO> diaries = diaryService.getAllDiaries();
            return ResponseEntity.ok(diaries);
        }
    }
    @PutMapping
    public ResponseEntity<DiaryResponseDTO> updateDiary(@RequestParam String date, @RequestBody DiaryRequestDTO diaryRequestDTO) {
        DiaryResponseDTO updatedDiary = diaryService.updateDiaryByDate(date, diaryRequestDTO);
        return updatedDiary != null ? ResponseEntity.ok(updatedDiary) : ResponseEntity.notFound().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteDiary(@RequestParam(required = false) String date) {
        if (date != null) {
            boolean deleted = diaryService.deleteDiaryByDate(date);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
        } else {
            diaryService.deleteAllDiaries();
            return ResponseEntity.noContent().build();
        }
    }
}