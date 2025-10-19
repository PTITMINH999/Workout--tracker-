package com.minh999.workout_tracker.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkoutRequest {
    @NotNull(message = "User ID cannot be null")
    @Positive(message = "User ID must be positive")
    Long userId;

    @NotNull(message = "Workout date cannot be null")
   // @PastOrPresent(message = "Workout date cannot be in the future")
    LocalDateTime date;
    String notes;
}
