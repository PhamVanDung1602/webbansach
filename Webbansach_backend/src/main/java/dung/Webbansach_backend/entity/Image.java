package dung.Webbansach_backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Image {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name="image_id")
   private int imageID;

   @Column(name="image_name", length=256)
   private String imageName;

   @Column(name="icon")//tiny int
   private boolean icon;

   @Column(name="link")
   private String link;

   @Column(name="image_data")
   @Lob
   private String imageData;

   @ManyToOne(cascade = {
           CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH
   })
   @JoinColumn(name="book_id", nullable = false)
   private Book book;
}
