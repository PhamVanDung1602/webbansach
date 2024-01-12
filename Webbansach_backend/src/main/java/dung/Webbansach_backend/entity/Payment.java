package dung.Webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name="payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="payment_id")
    private int paymentID;

    @Column(name="payment_name", length = 256)
    private String paymentName;

    @Column(name="description", length =512)
    private String description;

    @Column(name="payment_cost")
    private double paymentCost;

    @OneToMany(mappedBy = "payment",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
            }
    )
    private List<Order> orderList;
}
