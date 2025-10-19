package com.minh999.workout_tracker.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthResponse {
    Long id;
    String username;
    String email;
    String token;
    String refreshToken;
    String message;
    Set<String> roles;
}
