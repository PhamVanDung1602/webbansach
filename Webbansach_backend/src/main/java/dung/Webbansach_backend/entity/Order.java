package dung.Webbansach_backend.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
@Entity
@Table(name="order_o")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_id")
    private int orderID;

    @Column(name="created_date")
    private Date createdDate;

    @Column(name="purchasing_address", length= 512)
    private String purchasingAddress;

    @Column(name="delivery_address", length = 512)
    private String deliveryAddress;

    @Column(name="total_price")
    private double totalPrice;

    @Column(name="payment_cost")
    private double paymentCost;

    @Column(name="delivery_cost")
    private double deliveryCost;

    @Column(name="product_cost")
    private double productCost;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @OneToMany(mappedBy = "order",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
            }
    )
    private List<OrderDetail> orderDetailList;

    @Column(name="payment_status", length = 512)
    private String paymentStatus;

    @Column(name="delivery_status", length = 512)
    private String deliveryStatus;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinColumn(name="payment_id",nullable = true)
    private Payment payment;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinColumn(name="delivery_id",nullable = true)
    private Delivery delivery;


}
