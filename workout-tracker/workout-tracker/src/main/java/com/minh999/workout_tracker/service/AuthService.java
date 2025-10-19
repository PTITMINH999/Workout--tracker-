package com.minh999.workout_tracker.service;

import com.minh999.workout_tracker.dto.request.LoginRequest;
import com.minh999.workout_tracker.dto.request.RegisterRequest;
import com.minh999.workout_tracker.dto.request.TokenRefreshRequest;
import com.minh999.workout_tracker.dto.response.AuthResponse;
import com.minh999.workout_tracker.dto.response.TokenRefreshResponse;
import com.minh999.workout_tracker.entity.RefreshToken;
import com.minh999.workout_tracker.entity.Role;
import com.minh999.workout_tracker.entity.User;
import com.minh999.workout_tracker.exception.AppException;
import com.minh999.workout_tracker.exception.ErrorCode;
import com.minh999.workout_tracker.repository.RefreshTokenRepository;
import com.minh999.workout_tracker.repository.RoleRepository;
import com.minh999.workout_tracker.repository.UserRepository;
import com.minh999.workout_tracker.security.JwtUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthService {
    UserRepository userRepository;
    JwtUtils jwtUtils;
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
    RoleRepository roleRepository;
    RefreshTokenService refreshTokenService;
    RefreshTokenRepository refreshTokenRepository;
    public AuthResponse register(RegisterRequest request) {
        if(userRepository.existsByUsername(request.getUsername())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        Role userRole = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOTFOUND));

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(userRole))
                .build();

        userRepository.save(user);
        String token = jwtUtils.generateToken(user.getUsername());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        return AuthResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .token(token)
                .refreshToken(refreshToken.getToken())
                .message("User registered successfully")
                .build();
    }

    public AuthResponse login(LoginRequest request){
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new AppException(ErrorCode.WRONG_PASSWORD);
        }

        String token = jwtUtils.generateToken(user.getUsername());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());
        Set<String> roleNames = user.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toSet());

        return AuthResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .token(token)
                .refreshToken(refreshToken.getToken())
                .roles(roleNames)
                .message("Login successful")
                .build();
    }

    public AuthResponse createAdmin(RegisterRequest request) {
        if(userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        if(userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        }

        Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOTFOUND));

        User admin = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(adminRole))
                .build();

        userRepository.save(admin);

        String token = jwtUtils.generateToken(admin.getUsername());

        return AuthResponse.builder()
                .username(admin.getUsername())
                .email(admin.getEmail())
                .token(token)
                .message("Admin created successfully")
                .build();
    }

    public TokenRefreshResponse refreshToken(TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        RefreshToken refreshToken = refreshTokenRepository.findByToken(requestRefreshToken)
                .orElseThrow(() -> new AppException(ErrorCode.TOKEN_INVALID));
        refreshToken = refreshTokenService.verifyExpiration(refreshToken);
        User user = refreshToken.getUser();
        String newAccessToken = jwtUtils.generateToken(user.getUsername());

        return TokenRefreshResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken.getToken())
                .build();
    }
}
