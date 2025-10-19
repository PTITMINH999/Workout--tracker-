package com.minh999.workout_tracker.dto.request;

import com.minh999.workout_tracker.validator.ValidPassword;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginRequest {
    @NotBlank(message = "Username cannot be empty")
    String username;

    @ValidPassword(message = "PASSWORD_INVALID")
    String password;
}
