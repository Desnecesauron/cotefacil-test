package br.com.desnecesauron.cotefaciljavatest.controllers;

import br.com.desnecesauron.cotefaciljavatest.services.SwService;
import lombok.extern.java.Log;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log
@RestController
@CrossOrigin
@RequestMapping("/sw/")
public class SwController {

    final SwService swService;

    public SwController(SwService swService) {
        this.swService = swService;
    }

    @GetMapping
    public Object getAllData() {
        log.info("Reaching here");
        if (swService.getCount() != 0) {
            return swService.getAll();
        } else {
            return null;
        }
    }

}
