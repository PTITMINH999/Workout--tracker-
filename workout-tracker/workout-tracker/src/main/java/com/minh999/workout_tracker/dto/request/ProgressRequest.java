package com.minh999.workout_tracker.dto.request;

import com.minh999.workout_tracker.validator.ValidBodyFat;
import com.minh999.workout_tracker.validator.ValidWeight;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProgressRequest {
    @NotNull(message = "User ID cannot be null")
    @Positive(message = "User ID must be positive")
    Long userId;

    @NotNull(message = "Date cannot be null")
    @PastOrPresent(message = "Date cannot be in the future")
    LocalDateTime date;

    @ValidWeight(message = "WEIGHT_INVALID")
    Double weight;

    @ValidBodyFat(message = "BODYFAT_INVALID")
    Double bodyFat;

    String notes;
}
