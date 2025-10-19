package com.minh999.workout_tracker.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CaloriesBurnedValidator implements ConstraintValidator<ValidCaloriesBurned,Double> {
    @Override
    public boolean isValid(Double CaloriesBurned, ConstraintValidatorContext context) {
        if (CaloriesBurned == null) return false;
        return CaloriesBurned >= 0 && CaloriesBurned <= 2000;
    }

    @Override
    public void initialize(ValidCaloriesBurned constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
}
