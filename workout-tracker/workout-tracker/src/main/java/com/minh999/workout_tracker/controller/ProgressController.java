package com.minh999.workout_tracker.controller;

import com.minh999.workout_tracker.dto.request.ApiResponse;
import com.minh999.workout_tracker.dto.request.ProgressRequest;
import com.minh999.workout_tracker.dto.response.ProgressResponse;
import com.minh999.workout_tracker.service.ProgressService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/progress")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProgressController {
    ProgressService progressService;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    ApiResponse<ProgressResponse> addProgress(@RequestBody @Valid ProgressRequest request){
        return ApiResponse.<ProgressResponse>builder()
                .result(progressService.addProgress(request))
                .build();
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    ApiResponse<List<ProgressResponse>> getProgressByUser(@PathVariable Long userId){
        return ApiResponse.<List<ProgressResponse>>builder()
                .result(progressService.getProgressByUser(userId))
                .build();
    }

    @GetMapping("/user/{userId}/range")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    public ApiResponse<List<ProgressResponse>> getProgressByUserAndDateRange(
            @PathVariable Long userId,
            @RequestParam("start") LocalDateTime start,
            @RequestParam("end") LocalDateTime end
    ) {
        return ApiResponse.<List<ProgressResponse>>builder()
                .result(progressService.getProgressByUserAndDateRange(userId,start,end))
                .build();
    }

    @DeleteMapping("/{progressId}")
    @PreAuthorize("hasRole('ADMIN') or @progressService.isOwner(#progressId, authentication.principal.id)")
    ApiResponse<String> deleteWorkout(@PathVariable Long progressId) {
        progressService.deleteProgress(progressId);
        return ApiResponse.<String>builder()
                .result("Progress has been deleted")
                .build();
    }
}
