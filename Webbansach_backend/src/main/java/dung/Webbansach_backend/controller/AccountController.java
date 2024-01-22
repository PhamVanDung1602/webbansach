package dung.Webbansach_backend.controller;

import dung.Webbansach_backend.entity.User;
import dung.Webbansach_backend.security.JWTResponse;
import dung.Webbansach_backend.security.LoginRequest;
import dung.Webbansach_backend.service.AccountService;
import dung.Webbansach_backend.service.JWTService;
import dung.Webbansach_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from 'http://localhost:3000'
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JWTService jwtService;


    //register new account
    @PostMapping("/register")
    public ResponseEntity<?> registerNewUser(@Validated @RequestBody User user){

        int day = Integer.parseInt(user.getBirthDay().getDay());
        int month = Integer.parseInt(user.getBirthDay().getMonth());

        if (month >= 1 && month <= 9) {
            user.getBirthDay().setMonth("0"+user.getBirthDay().getMonth());
        }


        if (day >= 1 && day <= 9) {
            user.getBirthDay().setDay("0"+ user.getBirthDay().getDay());
        }
        ResponseEntity<?> response = accountService.registerNewUser(user);
        return response;
    }

    //activate new account through email
    @GetMapping("/activate")
    public ResponseEntity<?> activateNewAccount(@RequestParam String email, @RequestParam String activationCode){
        ResponseEntity<?> response = accountService.activateNewAccount(email, activationCode);
        return response;
    }

    //login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        //authenticate user by username and password
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword())
            );
            //If authentication is successful
            if (authentication.isAuthenticated()){
                final String jwt = jwtService.generateToKen(loginRequest.getUsername());
                return ResponseEntity.ok(new JWTResponse(jwt));
            }
        }catch (AuthenticationException e){
            // is not successful
            return ResponseEntity.badRequest().body("Tên đăng nhập hoặc mật khẩu không chính xác.");
        }
        return ResponseEntity.badRequest().body("Xác thực không thành công.");
    }

}
