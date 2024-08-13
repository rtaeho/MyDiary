package com.mydiary.service;

import com.mydiary.dto.DiaryRequestDTO;
import com.mydiary.dto.DiaryResponseDTO;
import com.mydiary.model.Diary;
import com.mydiary.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DiaryService {

    @Autowired
    private DiaryRepository diaryRepository;

    public DiaryResponseDTO createDiary(DiaryRequestDTO diaryRequestDTO) {
        Diary diary = new Diary();
        diary.setTitle(diaryRequestDTO.getTitle());
        diary.setDate(diaryRequestDTO.getDate());
        diary.setContent(diaryRequestDTO.getContent());
        Diary savedDiary = diaryRepository.save(diary);
        return mapToResponseDTO(savedDiary);
    }

    public DiaryResponseDTO getDiaryById(Long id) {
        Optional<Diary> diaryOptional = diaryRepository.findById(id);
        return diaryOptional.map(this::mapToResponseDTO).orElse(null);
    }

    public List<DiaryResponseDTO> getAllDiaries() {
        List<Diary> diaries = diaryRepository.findAll();
        return diaries.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public DiaryResponseDTO updateDiary(Long id, DiaryRequestDTO diaryRequestDTO) {
        Optional<Diary> diaryOptional = diaryRepository.findById(id);
        if (diaryOptional.isPresent()) {
            Diary diary = diaryOptional.get();
            diary.setTitle(diaryRequestDTO.getTitle());
            diary.setDate(diaryRequestDTO.getDate());
            diary.setContent(diaryRequestDTO.getContent());
            Diary updatedDiary = diaryRepository.save(diary);
            return mapToResponseDTO(updatedDiary);
        }
        return null;
    }

    public void deleteDiary(Long id) {
        diaryRepository.deleteById(id);
    }

    private DiaryResponseDTO mapToResponseDTO(Diary diary) {
        DiaryResponseDTO responseDTO = new DiaryResponseDTO();
        responseDTO.setId(diary.getId());
        responseDTO.setTitle(diary.getTitle());
        responseDTO.setDate(diary.getDate());
        responseDTO.setContent(diary.getContent());
        return responseDTO;
    }
}