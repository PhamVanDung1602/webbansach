package dung.Webbansach_backend.service;

import dung.Webbansach_backend.dao.RoleRepository;
import dung.Webbansach_backend.dao.UserRepository;
import dung.Webbansach_backend.entity.Role;
import dung.Webbansach_backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserServiceInterface {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);

        if (user == null){
            throw new UsernameNotFoundException("Tài khoản không tồn tại!");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                rolesToAuthorities(user.getRoleList()));

    }
    private Collection<? extends GrantedAuthority> rolesToAuthorities(List<Role> roles){
        return roles.stream().map(
                role -> new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());
    }
}
