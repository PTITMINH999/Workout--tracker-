package com.minh999.workout_tracker.exception;

import lombok.Data;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1004, "Validation failed", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1001, "User existed", HttpStatus.BAD_REQUEST),
    EMAIL_EXISTED(1002, "Email already existed", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1005,"Password must be at least 8 characters long, include uppercase, lowercase, number, and special character",HttpStatus.BAD_REQUEST),
    WRONG_PASSWORD(1006,"Your password is incorrect",HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1003, "User not found", HttpStatus.NOT_FOUND),
    EXERCISE_EXISTED(2001,"Exercise already existed",HttpStatus.BAD_REQUEST),
    EXERCISE_NOT_EXISTED(2002,"Exercise not found",HttpStatus.NOT_FOUND),
    CALORIES_INVALID(2003,"Calories burned must be greater than 0 and cannot exceed 2000",HttpStatus.BAD_REQUEST),
    INVALID_EXERCISE_DATA(2003, "Invalid exercise data", HttpStatus.BAD_REQUEST),
    WORKOUT_NOT_EXISTED(3001, "Workout not found", HttpStatus.NOT_FOUND),
    PROGRESS_NOT_EXISTED(3002, "Progress not found", HttpStatus.NOT_FOUND),
    WEIGHT_INVALID(4001,"Weight must be greater than 0 and less than 500",HttpStatus.BAD_REQUEST),
    BODYFAT_INVALID(4002,"BodyFat must be at least 1.0 and less than 70.0",HttpStatus.BAD_REQUEST),
    ROLE_NOTFOUND(5001,"Role not found in database",HttpStatus.NOT_FOUND),
    FORBIDDEN(9001, "You do not have permission", HttpStatus.FORBIDDEN),
    TOKEN_EXPIRED(6001,"Token has expired",HttpStatus.UNAUTHORIZED),
    TOKEN_INVALID(6002, "Refresh token is invalid",HttpStatus.UNAUTHORIZED)
    ;


    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
