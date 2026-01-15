package com.example.school.controller;

import com.example.school.model.Nota;
import com.example.school.service.NotaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notas")
public class NotaController {

    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    @PostMapping
    public ResponseEntity<Nota> registrarNota(
            @RequestParam Long alumnoId,
            @RequestParam Long materiaId,
            @RequestParam Double valor) {

        return ResponseEntity.ok(
                notaService.registrarNota(alumnoId, materiaId, valor)
        );
    }

    @GetMapping("/alumno/{alumnoId}")
    public ResponseEntity<List<Nota>> listarNotasPorAlumno(
            @PathVariable Long alumnoId) {

        return ResponseEntity.ok(
                notaService.listarNotasPorAlumno(alumnoId)
        );
    }
}
