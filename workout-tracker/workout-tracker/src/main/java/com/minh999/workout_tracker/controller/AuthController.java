package com.minh999.workout_tracker.controller;

import com.minh999.workout_tracker.dto.request.ApiResponse;
import com.minh999.workout_tracker.dto.request.LoginRequest;
import com.minh999.workout_tracker.dto.request.RegisterRequest;
import com.minh999.workout_tracker.dto.request.TokenRefreshRequest;
import com.minh999.workout_tracker.dto.response.AuthResponse;
import com.minh999.workout_tracker.dto.response.TokenRefreshResponse;
import com.minh999.workout_tracker.service.AuthService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthController {
    AuthService authService;

    @PostMapping("/register")
    public ApiResponse<AuthResponse> register(@RequestBody @Valid RegisterRequest request){
        return ApiResponse.<AuthResponse>builder()
                .result(authService.register(request))
                .build();
    }

    @PostMapping("/login")
    public ApiResponse<AuthResponse> login(@RequestBody @Valid LoginRequest request){
        return ApiResponse.<AuthResponse>builder()
                .result(authService.login(request))
                .build();
    }

    @PostMapping("/register-admin")
    public ApiResponse<AuthResponse> createAdmin(@RequestBody @Valid RegisterRequest request) {
        return ApiResponse.<AuthResponse>builder()
                .result(authService.createAdmin(request))
                .build();
    }

    @PostMapping("/refresh-token")
    public ApiResponse<TokenRefreshResponse> refreshToken(@RequestBody @Valid TokenRefreshRequest request){
        return ApiResponse.<TokenRefreshResponse>builder()
                .result(authService.refreshToken(request))
                .build();
    }
}
