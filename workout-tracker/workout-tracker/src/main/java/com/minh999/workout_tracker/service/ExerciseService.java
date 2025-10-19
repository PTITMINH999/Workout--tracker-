package com.minh999.workout_tracker.service;

import com.minh999.workout_tracker.dto.request.ExerciseRequest;
import com.minh999.workout_tracker.dto.response.ExerciseResponse;
import com.minh999.workout_tracker.dto.response.PageResponse;
import com.minh999.workout_tracker.entity.Exercise;
import com.minh999.workout_tracker.exception.AppException;
import com.minh999.workout_tracker.exception.ErrorCode;
import com.minh999.workout_tracker.mapper.ExerciseMapper;
import com.minh999.workout_tracker.repository.ExerciseRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ExerciseService {
    ExerciseRepository exerciseRepository;
    ExerciseMapper exerciseMapper;

    public ExerciseResponse createExercise(ExerciseRequest request) {
        if (exerciseRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.EXERCISE_EXISTED);
        }
        Exercise exercise = exerciseMapper.toExercise(request);
        return exerciseMapper.toExerciseResponse(exerciseRepository.save(exercise));
    }

    public List<ExerciseResponse> getAllExercisesWithoutPaging(){
        return exerciseRepository.findAll()
                .stream()
                .map(exerciseMapper::toExerciseResponse)
                .toList();
    }

    public ExerciseResponse getExercise(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EXERCISE_NOT_EXISTED));
        return exerciseMapper.toExerciseResponse(exercise);
    }

    public ExerciseResponse updateExercise(Long id, ExerciseRequest request) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EXERCISE_NOT_EXISTED));
        exerciseMapper.updateExercise(exercise, request);
        return exerciseMapper.toExerciseResponse(exerciseRepository.save(exercise));
    }

    public void deleteExercise(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.EXERCISE_NOT_EXISTED));
        exerciseRepository.delete(exercise);
    }

    public PageResponse<ExerciseResponse> getAllExercises(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Exercise> exercisePage = exerciseRepository.findAll(pageable);
        List<ExerciseResponse> exercises = exercisePage
                .stream()
                .map(exerciseMapper::toExerciseResponse)
                .toList();

        return PageResponse.<ExerciseResponse>builder()
                .items(exercises)
                .currentPage(exercisePage.getNumber())
                .pageSize(exercisePage.getSize())
                .totalItems(exercisePage.getTotalElements())
                .totalPages(exercisePage.getTotalPages())
                .last(exercisePage.isLast())
                .build();
    }

    public PageResponse<ExerciseResponse> getExercisesByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Exercise> exercisePage = exerciseRepository.findByCategoryIgnoreCase(category, pageable);
        List<ExerciseResponse> exercises = exercisePage
                .stream()
                .map(exerciseMapper::toExerciseResponse)
                .toList();

        return PageResponse.<ExerciseResponse>builder()
                .items(exercises)
                .currentPage(exercisePage.getNumber())
                .pageSize(exercisePage.getSize())
                .totalItems(exercisePage.getTotalElements())
                .totalPages(exercisePage.getTotalPages())
                .last(exercisePage.isLast())
                .build();
    }

    public PageResponse<ExerciseResponse> searchExercisesByName(String name,int page,int size){
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Exercise> exercisePage = exerciseRepository.findByNameContainingIgnoreCase(name, pageable);
        List<ExerciseResponse> exercises = exercisePage
                .stream()
                .map(exerciseMapper::toExerciseResponse)
                .toList();

        return PageResponse.<ExerciseResponse>builder()
                .items(exercises)
                .currentPage(exercisePage.getNumber())
                .pageSize(exercisePage.getSize())
                .totalItems(exercisePage.getTotalElements())
                .totalPages(exercisePage.getTotalPages())
                .last(exercisePage.isLast())
                .build();
    }
}
