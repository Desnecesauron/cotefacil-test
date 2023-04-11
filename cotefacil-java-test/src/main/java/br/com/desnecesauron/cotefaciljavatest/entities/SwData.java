package br.com.desnecesauron.cotefaciljavatest.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@Table
@NoArgsConstructor
public class SwData {


    @Id
    private String id = String.valueOf(UUID.randomUUID());

    String name;
    String climate;
    String terrain;
}
