package com.minh999.workout_tracker.dto.request;

import com.minh999.workout_tracker.validator.ValidPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {
    @NotBlank(message = "Username cannot be empty")
    @Size(min = 3, max = 50)
    String username;

    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Email must be valid")
    String email;

    @ValidPassword(message = "PASSWORD_INVALID")
    String password;
}
