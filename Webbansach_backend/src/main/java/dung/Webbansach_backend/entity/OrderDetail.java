package dung.Webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_detail_id")
    private int orderDetailID;

    @Column(name="price")
    private double price;

    @Column(name="quantity")
    private int quantity;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinColumn(name="order_id",nullable = false)
    private Order order;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinColumn(name="book_id",nullable = false)
    private Book book;

}
