package br.com.desnecesauron.cotefaciljavatest.controllers;

import br.com.desnecesauron.cotefaciljavatest.entities.SwData;
import br.com.desnecesauron.cotefaciljavatest.services.SwService;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.*;

@Log
@RestController
@CrossOrigin
@RequestMapping("sw/")
public class SwController {

    final SwService swService;

    public SwController(SwService swService) {
        this.swService = swService;
    }

    @GetMapping
    public Object getAll() {
        return swService.getAll();
    }

    @PostMapping
    public SwData save(@RequestBody SwData swData) {
        if (swData.getId() != null) {
            SwData searchSwData = swService.findById(swData.getId());
            if (searchSwData != null) {
                searchSwData = swData;
                return swService.save(searchSwData);
            }
        }
        return swService.save(swData);
    }

    @GetMapping("name/{name}")
    public Object findByNameContaining(@PathVariable String name) {
        return swService.findByNameContaining(name);
    }

    @GetMapping("id/{id}")
    public Object findById(@PathVariable String id) {
        return swService.findById(id);
    }

    @DeleteMapping("delete/{id}")
    public void deleteById(@PathVariable String id) {
        swService.deleteById(id);
    }
}
