package dung.Webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private int userID;

    @Column(name="full_name",length = 512)
    private String fullName;

    @Column(name="gender")
    private String gender;

    @Column(name="birth_day")
    @Embedded
    private BirthDay birthDay;

    @Column(name="username",length = 256)
    private String username;

    @Column(name="password",length = 512)
    private String password;

    @Column(name="email")
    private String email;

    @Column(name="activated")
    private boolean activated;

    @Column(name="activation_code")
    private String activationCode;

    @Column(name="phone_number")
    private String phoneNumber;

    @Column(name="purchasing_address")
    private String purchasingAddress;

    @Column(name="delivery_address")
    private String deliveryAddress;

    @Lob
    @Column(name="avatar", columnDefinition = "LONGTEXT" )
    private String avatar;

    @OneToMany(mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
            }
    )
    private List<Review> reviewList;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {
            CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinTable(name ="user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name= "role_id")
    )
    private List<Role> roleList;

    /*
    @OneToMany(mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
            }
    )
    private List<Cart> cartList;

     */

    @OneToMany(mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
            }
    )
    private List<Order> orderList;

    @OneToMany(mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
            }
    )
    private List<FavoriteBook> favoriteBookList;

}
