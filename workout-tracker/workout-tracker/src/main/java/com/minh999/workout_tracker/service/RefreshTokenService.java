package com.minh999.workout_tracker.service;

import com.minh999.workout_tracker.entity.RefreshToken;
import com.minh999.workout_tracker.entity.User;
import com.minh999.workout_tracker.exception.AppException;
import com.minh999.workout_tracker.exception.ErrorCode;
import com.minh999.workout_tracker.repository.RefreshTokenRepository;
import com.minh999.workout_tracker.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RefreshTokenService {
    RefreshTokenRepository refreshTokenRepository;
    UserRepository userRepository;

    long refreshTokenDurationMs = 15 * 24 * 60 * 60 * 1000;
    public RefreshToken createRefreshToken(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusMillis(refreshTokenDurationMs))
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(token);
            throw new AppException(ErrorCode.TOKEN_EXPIRED);
        }
        return token;
    }
}
