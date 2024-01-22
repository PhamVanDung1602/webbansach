package dung.Webbansach_backend.service;

import dung.Webbansach_backend.entity.Role;
import dung.Webbansach_backend.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.internal.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JWTService {
    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    @Autowired
    private UserService userService;

    //Create JWT based on username
    public String generateToKen(String username){
        Map<String, Object> claims = new HashMap<>();
        User user = userService.findByUsername(username);
        boolean isAdmin = false;
        boolean isStaff = false;
        boolean isUser = false;

        if(user!=null && user.getRoleList().size()>0){
            List<Role> list = user.getRoleList();
            for (Role r:list) {
                if(r.getRoleName().equals("ADMIN")){
                    isAdmin=true;
                }
                if(r.getRoleName().equals("STAFF")){
                    isStaff=true;
                }
                if(r.getRoleName().equals("STAFF")){
                    isUser=true;
                }
            }
        }

        claims.put("isAdmin", isAdmin);
        claims.put("isStaff", isStaff);
        claims.put("isUser", isUser);
        return createTokenWithSelectedClaims(claims, username);
    }

    //Create JWT with selected claims
    private String createTokenWithSelectedClaims(Map<String, Object> claims, String username){
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+30*60*1000)) //JWT lasts for 30 mins
                .signWith(SignatureAlgorithm.HS256, getSignKey())
                .compact();
    }

    //get secret key
    private Key getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    //extract information
    private Claims extractAllClaims(String token){
        return Jwts.parser().setSigningKey(getSignKey()).build().parseClaimsJws(token).getBody();
    }

    // Extract specific information to a claim
    public <T> T extractClaim(String token, Function<Claims,T> claimsTFunction){
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    //Check expiration of JWT
    public Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    //extract username
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    //Check expired JWT
    public Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    //check for validity
    public Boolean validateToken(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        System.out.println(username);
        return (username.equals(userDetails.getUsername())&&!isTokenExpired(token));
    }


}
