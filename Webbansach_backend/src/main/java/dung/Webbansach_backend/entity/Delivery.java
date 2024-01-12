package dung.Webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name="delivery")
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="delivery_id")
    private int deliveryID;

    @Column(name="delivery_name", length = 256)
    private String deliveryName;

    @Column(name="description", length =512)
    private String description;

    @Column(name="delivery_cost")
    private double deliveryCost;

    @OneToMany(mappedBy = "delivery",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
            }
    )
    private List<Order> orderList;
}
