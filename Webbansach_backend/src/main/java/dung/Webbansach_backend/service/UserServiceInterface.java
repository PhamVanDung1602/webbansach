package dung.Webbansach_backend.service;

import dung.Webbansach_backend.entity.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserServiceInterface extends UserDetailsService {
    User findByUsername(String username);
}
