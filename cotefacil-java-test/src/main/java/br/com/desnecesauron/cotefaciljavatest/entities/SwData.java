package br.com.desnecesauron.cotefaciljavatest.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.UUID;

@Data
@Entity
public class SwData {


    @Id
    private String id = String.valueOf(UUID.randomUUID());

    String name;
    String climate;
    String terrain;
}
