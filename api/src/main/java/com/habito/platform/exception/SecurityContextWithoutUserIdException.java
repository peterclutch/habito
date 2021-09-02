package com.habito.platform.exception;

public class SecurityContextWithoutUserIdException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public SecurityContextWithoutUserIdException() {
        super("User not found");
    }
}
