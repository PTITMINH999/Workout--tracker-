package com.minh999.workout_tracker.service;

import com.minh999.workout_tracker.dto.request.WorkoutExerciseRequest;
import com.minh999.workout_tracker.dto.response.WorkoutExerciseResponse;
import com.minh999.workout_tracker.entity.Exercise;
import com.minh999.workout_tracker.entity.Workout;
import com.minh999.workout_tracker.entity.WorkoutExercise;
import com.minh999.workout_tracker.exception.AppException;
import com.minh999.workout_tracker.exception.ErrorCode;
import com.minh999.workout_tracker.mapper.WorkoutExerciseMapper;
import com.minh999.workout_tracker.repository.ExerciseRepository;
import com.minh999.workout_tracker.repository.WorkoutExerciseRepository;
import com.minh999.workout_tracker.repository.WorkoutRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class WorkoutExerciseService {
    WorkoutExerciseRepository workoutExerciseRepository;
    WorkoutRepository workoutRepository;
    ExerciseRepository exerciseRepository;
    WorkoutExerciseMapper workoutExerciseMapper;

    public WorkoutExerciseResponse addExerciseToWorkout(WorkoutExerciseRequest request) {
        Workout workout = workoutRepository.findById(request.getWorkoutId())
                .orElseThrow(() -> new AppException(ErrorCode.WORKOUT_NOT_EXISTED));
        Exercise exercise = exerciseRepository.findById(request.getExerciseId())
                .orElseThrow(() -> new AppException(ErrorCode.EXERCISE_NOT_EXISTED));

        WorkoutExercise we = workoutExerciseMapper.toWorkoutExercise(request, workout, exercise);
        return workoutExerciseMapper.toWorkoutExerciseResponse(workoutExerciseRepository.save(we));
    }

    public List<WorkoutExerciseResponse> getExercisesByWorkout(Long workoutId) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new AppException(ErrorCode.WORKOUT_NOT_EXISTED));
        return workoutExerciseRepository.findByWorkout(workout)
                .stream()
                .map(workoutExerciseMapper::toWorkoutExerciseResponse)
                .toList();
    }

    public boolean isOwner(Long workoutId, Long userId) {
        return workoutRepository.findById(workoutId)
                .map(workout -> workout.getUser().getId().equals(userId))
                .orElse(false);
    }
}
