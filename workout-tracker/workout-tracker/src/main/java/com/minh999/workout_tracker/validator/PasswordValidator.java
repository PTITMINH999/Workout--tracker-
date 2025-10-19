package com.minh999.workout_tracker.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<ValidPassword,String> {

    private static final String PASSWORD_PATTERN =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\\\":{}|<>]).{8,100}$";
    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if(password == null) return false;
        return password.matches(PASSWORD_PATTERN);
    }

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
}
