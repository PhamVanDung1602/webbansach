package dung.Webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;

@Data
@Entity
@Table(name="favorite_book")
public class FavoriteBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="favorite_book_id")
    private int favoriteBookId;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinColumn(name="user_id",nullable = false)
    private User user;

    @ManyToOne(cascade = {
            CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinColumn(name="book_id",nullable = false)
    private Book book;
}
