package dung.Webbansach_backend.security;

public class Endpoints {
    public static final String front_end_host = "http://localhost:3000";
    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/book",
            "/book/**",
            "/image",
            "/image/**",
            "user/search/existsByEmail",
            "user/search/existsByUsername",
            "/account/activate"
    };

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/account/register",
            "/account/login"
    };

    public static final String[] ADMIN_GET_ENDPOINTS = {
           "/user",
            "/user/**"
    };
    public static final String[] ADMIN_POST_ENDPOINTS = {
            "/book"
    };
}
