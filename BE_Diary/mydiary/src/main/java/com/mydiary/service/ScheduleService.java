package com.mydiary.service;

import com.mydiary.dto.ScheduleRequestDTO;
import com.mydiary.dto.ScheduleResponseDTO;
import com.mydiary.model.Schedule;
import com.mydiary.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public ScheduleResponseDTO createSchedule(ScheduleRequestDTO scheduleRequestDTO) {
        Schedule schedule = new Schedule();
        schedule.setTitle(scheduleRequestDTO.getTitle());
        schedule.setDate(scheduleRequestDTO.getDate());
        schedule.setDescription(scheduleRequestDTO.getDescription());
        Schedule savedSchedule = scheduleRepository.save(schedule);
        return mapToResponseDTO(savedSchedule);
    }

    public ScheduleResponseDTO getScheduleById(Long id) {
        Optional<Schedule> scheduleOptional = scheduleRepository.findById(id);
        return scheduleOptional.map(this::mapToResponseDTO).orElse(null);
    }

    public List<ScheduleResponseDTO> getAllSchedules() {
        List<Schedule> schedules = scheduleRepository.findAll();
        return schedules.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ScheduleResponseDTO updateSchedule(Long id, ScheduleRequestDTO scheduleRequestDTO) {
        Optional<Schedule> scheduleOptional = scheduleRepository.findById(id);
        if (scheduleOptional.isPresent()) {
            Schedule schedule = scheduleOptional.get();
            schedule.setTitle(scheduleRequestDTO.getTitle());
            schedule.setDate(scheduleRequestDTO.getDate());
            schedule.setDescription(scheduleRequestDTO.getDescription());
            Schedule updatedSchedule = scheduleRepository.save(schedule);
            return mapToResponseDTO(updatedSchedule);
        }
        return null;
    }

    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }

    private ScheduleResponseDTO mapToResponseDTO(Schedule schedule) {
        ScheduleResponseDTO responseDTO = new ScheduleResponseDTO();
        responseDTO.setId(schedule.getId());
        responseDTO.setTitle(schedule.getTitle());
        responseDTO.setDate(schedule.getDate());
        responseDTO.setDescription(schedule.getDescription());
        return responseDTO;
    }
}