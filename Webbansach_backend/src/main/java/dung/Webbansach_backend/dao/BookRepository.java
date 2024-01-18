package dung.Webbansach_backend.dao;

import dung.Webbansach_backend.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource(path = "book")
public interface BookRepository extends JpaRepository<Book, Integer> {
    Page<Book> findByBookNameContaining(@RequestParam("bookName") String bookName, Pageable pageable);

    Page<Book> findByGenreList_GenreID(@RequestParam("genreID") int genreID, Pageable pageable);

    Page<Book> findByBookNameContainingAndGenreList_GenreID(@RequestParam("bookName") String bookName,
                                                            @RequestParam("genreID") int genreID,
                                                            Pageable pageable);
}
