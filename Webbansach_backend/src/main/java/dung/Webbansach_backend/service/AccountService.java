package dung.Webbansach_backend.service;

import dung.Webbansach_backend.dao.UserRepository;
import dung.Webbansach_backend.entity.Notification;
import dung.Webbansach_backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

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

        //Attach and send activation information
        user.setActivationCode(createActivationCode());
        user.setActivated(false);

        //Send email to user for activation
        sendActivationCodeToEmail(user.getEmail(), user.getActivationCode());

        //Save user to the database
        User registeredUser = userRepository.save(user);
        return ResponseEntity.ok("Đăng ký thành công");
    }

    private String createActivationCode(){
        //create random code
        return UUID.randomUUID().toString();
    }

    private void sendActivationCodeToEmail(String email, String activationCode){
        String subject = "Kích hoạt tài khoản của bạn tại Webbansach";
        String text = "Vui lòng sử dụng mã sau để kích hoạt cho tài khoản <"+email+">:" +
                "<html> <body> <br/><h1>"+activationCode+"<h1/> <body/> <html/>";
               text+="<br/> Click vào đường link để kích hoạt tài khoản: ";
        String url = "http://localhost:3000/activate/"+email+"/"+activationCode;
        text+=("<br/> <a href="+url+">"+url+"</a> ");

        emailService.sendMessage("dungrunggiung@gmail.com", email, subject, text);
    }

    public ResponseEntity<?> activateNewAccount (String email, String activationCode){
        User user = userRepository.findByEmail(email);

        //Check whether the user exists or not
        if (user==null){
            return ResponseEntity.badRequest().body(new Notification("Người dùng không tồn tại!"));
        }

        //Check if the account is activated
        if(user.isActivated()){
            return ResponseEntity.badRequest().body(new Notification("Tài khoản đã được kích hoạt!"));
        }

        //Handle to activate account
        if(activationCode.equals(user.getActivationCode())){
            user.setActivated(true);
            userRepository.save(user);
            return ResponseEntity.ok("Kích hoạt tài khoản thành công!");
        } else {
            return ResponseEntity.badRequest().body(new Notification("Mã kích hoạt không chính xác!"));
        }


    }
}
