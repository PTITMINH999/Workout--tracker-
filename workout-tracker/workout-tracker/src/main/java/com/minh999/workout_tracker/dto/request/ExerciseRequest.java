package com.minh999.workout_tracker.dto.request;

import com.minh999.workout_tracker.validator.ValidCaloriesBurned;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ExerciseRequest {
    @NotBlank(message = "Exercise name cannot be empty")
    @Size(min = 2, max = 100, message = "Exercise name must be between 3 and 100 characters")
    String name;

    String description;

    @NotBlank(message = "Category cannot be empty")
    String category;

    @ValidCaloriesBurned(message = "CALORIES_INVALID")
    Double caloriesBurned;
}
