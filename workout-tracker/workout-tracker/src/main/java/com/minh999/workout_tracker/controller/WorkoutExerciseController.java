package com.minh999.workout_tracker.controller;

import com.minh999.workout_tracker.dto.request.ApiResponse;
import com.minh999.workout_tracker.dto.request.WorkoutExerciseRequest;
import com.minh999.workout_tracker.dto.response.WorkoutExerciseResponse;
import com.minh999.workout_tracker.service.WorkoutExerciseService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workout-exercises")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class WorkoutExerciseController {
    WorkoutExerciseService workoutExerciseService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    ApiResponse<WorkoutExerciseResponse> addExercise(@RequestBody @Valid WorkoutExerciseRequest request) {
        return ApiResponse.<WorkoutExerciseResponse>builder()
                .result(workoutExerciseService.addExerciseToWorkout(request))
                .build();
    }

    @GetMapping("/{workoutId}")
    @PreAuthorize("hasRole('ADMIN') or @workoutExerciseService.isOwner(#workoutId, authentication.principal.id)")
    ApiResponse<List<WorkoutExerciseResponse>> getExercises(@PathVariable Long workoutId) {
        return ApiResponse.<List<WorkoutExerciseResponse>>builder()
                .result(workoutExerciseService.getExercisesByWorkout(workoutId))
                .build();
    }
}
