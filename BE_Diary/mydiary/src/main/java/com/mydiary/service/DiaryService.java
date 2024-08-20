package com.mydiary.service;

import com.mydiary.dto.DiaryRequestDTO;
import com.mydiary.dto.DiaryResponseDTO;
import com.mydiary.model.Diary;
import com.mydiary.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class DiaryService {

    @Autowired
    private DiaryRepository diaryRepository;

    public DiaryResponseDTO createDiary(String date, DiaryRequestDTO diaryRequestDTO) {
        Diary diary = new Diary();
        diary.setTitle(diaryRequestDTO.getTitle());
        diary.setContent(diaryRequestDTO.getContent());
        diary.setDate(LocalDate.parse(date));
        Diary savedDiary = diaryRepository.save(diary);
        return convertToResponseDTO(savedDiary);
    }

    @Transactional(readOnly = true)
    public DiaryResponseDTO getDiaryByDate(String date) {
        LocalDate localDate = LocalDate.parse(date);
        Optional<Diary> diaryOptional = diaryRepository.findByDate(localDate);
        return diaryOptional.map(this::convertToResponseDTO).orElse(null);
    }

    @Transactional(readOnly = true)
    public List<DiaryResponseDTO> getAllDiaries() {
        List<Diary> diaries = diaryRepository.findAll();
        return diaries.stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public DiaryResponseDTO updateDiaryByDate(String date, DiaryRequestDTO diaryRequestDTO) {
        LocalDate localDate = LocalDate.parse(date);
        Optional<Diary> diaryOptional = diaryRepository.findByDate(localDate);
        if (diaryOptional.isPresent()) {
            Diary diary = diaryOptional.get();
            diary.setTitle(diaryRequestDTO.getTitle());
            diary.setContent(diaryRequestDTO.getContent());
            Diary updatedDiary = diaryRepository.save(diary);
            return convertToResponseDTO(updatedDiary);
        }
        return null;
    }

    @Transactional
    public boolean deleteDiaryByDate(String date) {
        LocalDate localDate = LocalDate.parse(date);
        Optional<Diary> diaryOptional = diaryRepository.findByDate(localDate);
        if (diaryOptional.isPresent()) {
            diaryRepository.delete(diaryOptional.get());
            return true;
        }
        return false;
    }

    @Transactional
    public void deleteAllDiaries() {
        diaryRepository.deleteAll();
    }

    private DiaryResponseDTO convertToResponseDTO(Diary diary) {
        DiaryResponseDTO dto = new DiaryResponseDTO();
        dto.setId(diary.getId());
        dto.setTitle(diary.getTitle());
        dto.setContent(diary.getContent());
        dto.setDate(diary.getDate());
        return dto;
    }
}