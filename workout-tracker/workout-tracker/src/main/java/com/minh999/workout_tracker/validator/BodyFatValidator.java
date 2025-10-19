package com.minh999.workout_tracker.validator;

import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class BodyFatValidator implements ConstraintValidator<ValidBodyFat,Double> {
    @Override
    public boolean isValid(Double bodyFat, ConstraintValidatorContext context) {
        if (bodyFat == null) return false;
        return bodyFat >= 0 && bodyFat <= 70;
    }

    @Override
    public void initialize(ValidBodyFat constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
}
