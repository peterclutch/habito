package com.habito.platform.security;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

@Getter
@EqualsAndHashCode
public class HabitoUser extends User {

    private final long userId;

    public HabitoUser(
        String username,
        String password,
        Long userId,
        Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.userId = userId;
    }
}
