package com.habito.platform.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(Class clazz, Object id) {
        super(String.format("No %s was found for identifier: %s", clazz.getSimpleName(), id));
    }
}
