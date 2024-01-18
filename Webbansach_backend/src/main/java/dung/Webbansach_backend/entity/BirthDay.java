package dung.Webbansach_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class BirthDay {
    @Column(name="day")
    private String day;

    @Column(name="month")
    private String month;

    @Column(name="year")
    private String year;

    public BirthDay() {
    }
}
