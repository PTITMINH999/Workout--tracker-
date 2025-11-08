package com.minh999.workout_tracker.dto.response;

import com.minh999.workout_tracker.entity.WorkoutStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WorkoutResponse {
    Long id;
    Long userId;
    String username;
    LocalDateTime date;
    WorkoutStatus status;
    String notes;
}
