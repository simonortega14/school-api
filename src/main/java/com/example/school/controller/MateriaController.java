package com.example.school.controller;

import com.example.school.model.Materia;
import com.example.school.service.MateriaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materias")
public class MateriaController {

    private final MateriaService materiaService;

    public MateriaController(MateriaService materiaService) {
        this.materiaService = materiaService;
    }

    @PostMapping
    public ResponseEntity<Materia> crear(@RequestBody Materia materia) {
        return ResponseEntity.ok(materiaService.crearMateria(materia));
    }

    @GetMapping
    public List<Materia> listar() {
        return materiaService.listarMaterias();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> obtener(@PathVariable Long id) {
        Materia materia = materiaService.obtenerMateriaPorId(id);
        return ResponseEntity.ok(materia);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Materia> actualizar(@PathVariable Long id,
                                               @RequestBody Materia materia) {
        return ResponseEntity.ok(materiaService.actualizarMateria(id, materia));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        materiaService.eliminarMateria(id);
        return ResponseEntity.noContent().build();
    }
}

