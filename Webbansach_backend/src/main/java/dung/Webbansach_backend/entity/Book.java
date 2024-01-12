package dung.Webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="book_id")
    private int bookID;

    @Column(name="book_name", length = 256)
    private String bookName;

    @Column(name="author", length = 512)
    private String author;

    @Column(name="isbn", length = 256)
    private String ISBN;

    @Column(name="description", columnDefinition = "text")
    private String description;

    @Column(name="listed_price")
    private double listedPrice;

    @Column(name="price")
    private double price;

    @Column(name="quantity")
    private int quantity;

    @Column(name="average_star")
    private double averageStar;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {
            CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
    })
    @JoinTable(name ="book_genre",
                joinColumns = @JoinColumn(name = "book_id"),
                inverseJoinColumns = @JoinColumn(name= "genre_id")
    )
    private List<BookGenre> genreList;

    @OneToMany(mappedBy = "book",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH,CascadeType.REMOVE
            }
            )
    private List<Image> imageList;


    @OneToMany(mappedBy = "book",
            fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,CascadeType.DETACH,CascadeType.MERGE,CascadeType.REFRESH
            }
    )
    private List<OrderDetail> orderDetailList;


    @OneToMany(mappedBy = "book",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private List<Rating> rating;

    @OneToMany(mappedBy = "book",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL
    )
    private List<FavoriteBook> favoriteBookList;
}
