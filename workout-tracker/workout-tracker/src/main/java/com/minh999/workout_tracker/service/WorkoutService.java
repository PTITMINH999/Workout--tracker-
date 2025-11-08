package com.minh999.workout_tracker.service;

import com.minh999.workout_tracker.dto.request.WorkoutRequest;
import com.minh999.workout_tracker.dto.response.CaloriesResponse;
import com.minh999.workout_tracker.dto.response.WorkoutResponse;
import com.minh999.workout_tracker.entity.User;
import com.minh999.workout_tracker.entity.Workout;
import com.minh999.workout_tracker.entity.WorkoutStatus;
import com.minh999.workout_tracker.exception.AppException;
import com.minh999.workout_tracker.exception.ErrorCode;
import com.minh999.workout_tracker.mapper.WorkoutMapper;
import com.minh999.workout_tracker.repository.UserRepository;
import com.minh999.workout_tracker.repository.WorkoutRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class WorkoutService {
    WorkoutRepository workoutRepository;
    UserRepository userRepository;
    WorkoutMapper workoutMapper;

    public WorkoutResponse createWorkout(WorkoutRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        Workout workout = workoutMapper.toWorkout(request, user);
        return workoutMapper.toWorkoutResponse(workoutRepository.save(workout));
    }

    private void updateLazyStatus(Workout workout) {
        LocalDateTime now = LocalDateTime.now();
        if (workout.getStatus() == WorkoutStatus.PENDING) {
            if (now.isAfter(workout.getDate()) && now.isBefore(workout.getDate().plusHours(2))) {
                workout.setStatus(WorkoutStatus.ACTIVE);
                workoutRepository.save(workout);
            } else if (now.isAfter(workout.getDate().plusHours(2))) {
                workout.setStatus(WorkoutStatus.COMPLETED);
                workoutRepository.save(workout);
            }
        } else if(workout.getStatus() == WorkoutStatus.ACTIVE && now.isAfter(workout.getDate().plusHours(3))){
            workout.setStatus(WorkoutStatus.COMPLETED);
            workoutRepository.save(workout);
        }
    }

    public List<WorkoutResponse> getWorkoutsByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        List<Workout> workouts = workoutRepository.findByUser(user);
        workouts.forEach(this::updateLazyStatus);
        return workouts
                .stream()
                .map(workoutMapper::toWorkoutResponse)
                .toList();
    }

    public WorkoutResponse completeWorkout(Long workoutId) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new AppException(ErrorCode.WORKOUT_NOT_EXISTED));
        workout.setStatus(WorkoutStatus.COMPLETED);
        workoutRepository.save(workout);
        return workoutMapper.toWorkoutResponse(workout);
    }

    public WorkoutResponse cancelWorkout(Long workoutId) {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new AppException(ErrorCode.WORKOUT_NOT_EXISTED));
        workout.setStatus(WorkoutStatus.CANCELLED);
        workoutRepository.save(workout);
        return workoutMapper.toWorkoutResponse(workout);
    }

    public Page<WorkoutResponse> getAllWorkouts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        Page<Workout> workouts = workoutRepository.findAll(pageable);
        workouts.forEach(this::updateLazyStatus);
        return workouts.map(workoutMapper::toWorkoutResponse);
    }

    public Page<WorkoutResponse> getWorkoutsByDate(LocalDate date, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.atTime(LocalTime.MAX);
        Page<Workout> workouts = workoutRepository.findByDateBetween(start,end, pageable);
        workouts.forEach(this::updateLazyStatus);
        return workouts.map(workoutMapper::toWorkoutResponse);
    }

    public CaloriesResponse calculateTotalCalories(Long workoutId){
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new AppException(ErrorCode.WORKOUT_NOT_EXISTED));

        double totalCalories = workout.getWorkoutExercises().stream()
                .mapToDouble(we -> we.getExercise().getCaloriesBurned() * we.getReps() * we.getSets())
                .sum();

        return CaloriesResponse.builder()
                .workoutId(workoutId)
                .totalCalories(totalCalories)
                .build();
    }

    public WorkoutResponse updateWorkout(Long id,WorkoutRequest request){
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.WORKOUT_NOT_EXISTED));
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));
        workoutMapper.updateWorkout(workout,request);
        return workoutMapper.toWorkoutResponse(workoutRepository.save(workout));
    }

    public void deleteWorkout(Long id){
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.WORKOUT_NOT_EXISTED));
        workoutRepository.delete(workout);
    }

    public boolean isOwner(Long workoutId, Long userId) {
        return workoutRepository.findById(workoutId)
                .map(workout -> workout.getUser().getId().equals(userId))
                .orElse(false);
    }
}
