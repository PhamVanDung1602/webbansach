package dung.Webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;
/*

@Data
@Entity
@Table(name="cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cart_id")
    private int cartID;

    @Column(name="created_date")
    private Date createdDate;

    @Column(name="purchasing_address")
    private String purchasingAddress;

    @Column(name="delivery_address")
    private String deliveryAddress;

    @Column(name="total_price")
    private double totalPrice;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @OneToMany(mappedBy = "cart",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private List<CartDetail> cartDetailList;
}

 */
