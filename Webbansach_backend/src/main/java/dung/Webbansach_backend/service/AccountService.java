package dung.Webbansach_backend.service;

import dung.Webbansach_backend.dao.UserRepository;
import dung.Webbansach_backend.entity.Notification;
import dung.Webbansach_backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public ResponseEntity<?> registerNewUser (User user){
        //Check whether the account exists or not
        if(userRepository.existsByUsername(user.getUsername())){
            return ResponseEntity.badRequest().body(new Notification("Tên đăng nhập đã tồn tại.") );
        }

        //Check if email exists or not
        if(userRepository.existsByEmail(user.getEmail())){
            return ResponseEntity.badRequest().body(new Notification("Email đã tồn tại."));
        }

        //Encode password
        String encryptPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptPassword);

        //Save user to the database
        User registeredUser = userRepository.save(user);
        return ResponseEntity.ok("Đăng ký thành công");
    }
}
