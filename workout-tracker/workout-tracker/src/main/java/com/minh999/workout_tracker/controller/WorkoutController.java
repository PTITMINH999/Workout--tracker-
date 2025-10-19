package com.minh999.workout_tracker.controller;

import com.minh999.workout_tracker.dto.request.ApiResponse;
import com.minh999.workout_tracker.dto.request.WorkoutRequest;
import com.minh999.workout_tracker.dto.response.CaloriesResponse;
import com.minh999.workout_tracker.dto.response.ExerciseResponse;
import com.minh999.workout_tracker.dto.response.WorkoutResponse;
import com.minh999.workout_tracker.service.WorkoutService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/workouts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class WorkoutController {
    WorkoutService workoutService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    ApiResponse<WorkoutResponse> createWorkout(@RequestBody @Valid WorkoutRequest request){
        return ApiResponse.<WorkoutResponse>builder()
                .result(workoutService.createWorkout(request))
                .build();
    }

    @GetMapping("/user/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    ApiResponse<List<WorkoutResponse>> getWorkoutByUser(@PathVariable Long id) {
        return ApiResponse.<List<WorkoutResponse>>builder()
                .result(workoutService.getWorkoutsByUserId(id))
                .build();
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    ApiResponse<Page<WorkoutResponse>> getAllWorkouts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        return ApiResponse.<Page<WorkoutResponse>>builder()
                .result(workoutService.getAllWorkouts(page, size))
                .build();
    }

    @GetMapping("/date")
    ApiResponse<Page<WorkoutResponse>> getWorkoutsByDate(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size
    ) {
        return ApiResponse.<Page<WorkoutResponse>>builder()
                .result(workoutService.getWorkoutsByDate(date, page, size))
                .build();
    }

    @GetMapping("/{workoutId}/calories")
    @PreAuthorize("hasRole('ADMIN') or @workoutService.isOwner(#workoutId, authentication.principal.id)")
    public ApiResponse<CaloriesResponse> getTotalCalories(@PathVariable Long workoutId) {
        return ApiResponse.<CaloriesResponse>builder()
                .result(workoutService.calculateTotalCalories(workoutId))
                .build();
    }

    @PutMapping("/{workoutId}")
    @PreAuthorize("hasRole('ADMIN') or @workoutService.isOwner(#workoutId, authentication.principal.id)")
    public ApiResponse<WorkoutResponse> updateWorkout(
            @PathVariable Long workoutId,
            @RequestBody @Valid WorkoutRequest request){
        return ApiResponse.<WorkoutResponse>builder()
                .result(workoutService.updateWorkout(workoutId,request))
                .build();
    }

    @DeleteMapping("/{workoutId}")
    @PreAuthorize("hasRole('ADMIN') or @workoutService.isOwner(#workoutId, authentication.principal.id)")
    ApiResponse<String> deleteWorkout(@PathVariable Long workoutId) {
        workoutService.deleteWorkout(workoutId);
        return ApiResponse.<String>builder()
                .result("Workout has been deleted")
                .build();
    }
}
