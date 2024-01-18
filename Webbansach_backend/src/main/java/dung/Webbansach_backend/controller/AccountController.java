package dung.Webbansach_backend.controller;

import dung.Webbansach_backend.entity.User;
import dung.Webbansach_backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @CrossOrigin(origins = "http://localhost:3000") // Allow requests from 'http://localhost:3000'
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
}
