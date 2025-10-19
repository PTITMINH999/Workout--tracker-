package com.minh999.workout_tracker.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class WeightValidator implements ConstraintValidator<ValidWeight,Double> {
    @Override
    public boolean isValid(Double weight, ConstraintValidatorContext context) {
        if (weight == null) return false;
        return weight > 0 && weight < 500;
    }

    @Override
    public void initialize(ValidWeight constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
}
