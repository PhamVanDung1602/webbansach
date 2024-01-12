package dung.Webbansach_backend.entity;

/*
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table (name ="cart_detail")
public class CartDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cart_detail_id")
    private long cartDetailID;

    @Column(name ="price")
    private double price;

    @Column(name="quantity")
    private int quantity;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinColumn(name="book_id",nullable = false)
    private Book book;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinColumn(name="cart_id",nullable = false)
    private Cart cart;
}
*/