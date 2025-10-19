    package com.minh999.workout_tracker.dto.response;

    import lombok.*;
    import lombok.experimental.FieldDefaults;

    import java.time.LocalDateTime;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public class ProgressResponse {
        Long id;
        Long userId;
        String username;
        LocalDateTime date;
        Double weight;
        Double bodyFat;
        String notes;
    }
