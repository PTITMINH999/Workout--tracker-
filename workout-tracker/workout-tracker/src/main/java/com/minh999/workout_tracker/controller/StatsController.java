package com.minh999.workout_tracker.controller;

import com.minh999.workout_tracker.dto.request.ApiResponse;
import com.minh999.workout_tracker.dto.response.DailyWorkoutStatsResponse;
import com.minh999.workout_tracker.dto.response.FavoriteExerciseResponse;
import com.minh999.workout_tracker.dto.response.WorkoutStatsResponse;
import com.minh999.workout_tracker.service.StatsService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stats")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class StatsController {
    StatsService statsService;
    @GetMapping("/workouts")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    ApiResponse<WorkoutStatsResponse> getWorkoutStats(
            @RequestParam Long userId,
            @RequestParam int year,
            @RequestParam int month
    ) {
        return ApiResponse.<WorkoutStatsResponse>builder()
                .result(statsService.getMonthlyWorkoutStats(userId, year, month))
                .build();
    }

    @GetMapping("/favorites")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    ApiResponse<List<FavoriteExerciseResponse>> getFavoriteExercises(
            @RequestParam Long userId,
            @RequestParam(defaultValue = "2") int limit
    ) {
        return ApiResponse.<List<FavoriteExerciseResponse>>builder()
                .result(statsService.getFavoriteExercises(userId, limit))
                .build();
    }

    @GetMapping("/weekly")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    ApiResponse<WorkoutStatsResponse> getWeeklyWorkoutStats(
            @RequestParam Long userId
    ) {
        return ApiResponse.<WorkoutStatsResponse>builder()
                .result(statsService.getWeeklyWorkoutStats(userId))
                .build();
    }

    @GetMapping("/weekly-daily")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    public ApiResponse<List<DailyWorkoutStatsResponse>> getWeeklyDailyStats(
            @RequestParam Long userId
    ) {
        List<DailyWorkoutStatsResponse> res = statsService.getWeeklyDailyStats(userId);
        return ApiResponse.<List<DailyWorkoutStatsResponse>>builder()
                .result(res)
                .build();
    }
}
