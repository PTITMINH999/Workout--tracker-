package com.minh999.workout_tracker.controller;

import com.minh999.workout_tracker.dto.request.ApiResponse;
import com.minh999.workout_tracker.dto.request.ExerciseRequest;
import com.minh999.workout_tracker.dto.response.ExerciseResponse;
import com.minh999.workout_tracker.dto.response.PageResponse;
import com.minh999.workout_tracker.dto.response.UserResponse;
import com.minh999.workout_tracker.service.ExerciseService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercises")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ExerciseController {
    ExerciseService exerciseService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    ApiResponse<ExerciseResponse> createExercise(@RequestBody @Valid ExerciseRequest request){
        return ApiResponse.<ExerciseResponse>builder()
                .result(exerciseService.createExercise(request))
                .build();
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/{id}")
    ApiResponse<ExerciseResponse> getExerciseById(@PathVariable Long id) {
        return ApiResponse.<ExerciseResponse>builder()
                .result(exerciseService.getExercise(id))
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    ApiResponse<ExerciseResponse> updateExercise(@PathVariable Long id,
                                                @RequestBody @Valid ExerciseRequest request) {
        return ApiResponse.<ExerciseResponse>builder()
                .result(exerciseService.updateExercise(id, request))
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    ApiResponse<String> delete(@PathVariable Long id) {
        exerciseService.deleteExercise(id);
        return ApiResponse.<String>builder()
                .result("Exercise has been deleted")
                .build();
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping
    ApiResponse<?> getAllExercises(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        if (page == null || size == null) {
            // Lấy tất cả
            return ApiResponse.<List<ExerciseResponse>>builder()
                    .result(exerciseService.getAllExercisesWithoutPaging())
                    .build();
        }
        return ApiResponse.<PageResponse<ExerciseResponse>>builder()
                .result(exerciseService.getAllExercises(page, size))
                .build();
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/category/{category}")
    ApiResponse<PageResponse<ExerciseResponse>> getExercisesByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "2") int size
    ) {
        return ApiResponse.<PageResponse<ExerciseResponse>>builder()
                .result(exerciseService.getExercisesByCategory(category, page, size))
                .build();
    }

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/searchbyname")
    ApiResponse<PageResponse<ExerciseResponse>> searchExercisesByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        return ApiResponse.<PageResponse<ExerciseResponse>>builder()
                .result(exerciseService.searchExercisesByName(name, page, size))
                .build();
    }
}
