package com.minh999.workout_tracker.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExerciseResponse {
    Long id;
    String name;
    String description;
    String category;
    Double caloriesBurned;
}
