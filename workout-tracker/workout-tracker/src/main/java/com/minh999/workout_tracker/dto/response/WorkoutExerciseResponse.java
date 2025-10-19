package com.minh999.workout_tracker.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkoutExerciseResponse {
    Long id;
    Long workoutId;
    Long exerciseId;
    String exerciseName;
    Integer sets;
    Integer reps;
}
