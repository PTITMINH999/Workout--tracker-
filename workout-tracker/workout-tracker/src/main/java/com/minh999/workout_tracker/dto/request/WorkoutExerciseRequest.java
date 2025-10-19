package com.minh999.workout_tracker.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkoutExerciseRequest {
    @NotNull(message = "Workout ID cannot be null")
    @Positive(message = "Workout ID must be positive")
    Long workoutId;
    @NotNull(message = "Exercise ID cannot be null")
    @Positive(message = "Exercise ID must be positive")
    Long exerciseId;
    @NotNull(message = "Sets cannot be null")
    Integer sets;
    @NotNull(message = "Reps cannot be null")
    Integer reps;
}
