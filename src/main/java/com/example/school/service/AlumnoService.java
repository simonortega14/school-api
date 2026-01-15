package com.example.school.service;

import com.example.school.model.Alumno;
import com.example.school.repository.AlumnoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlumnoService {

    private final AlumnoRepository alumnoRepository;

    public AlumnoService(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    public Alumno crearAlumno(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    public List<Alumno> listarAlumnos() {
        return alumnoRepository.findAll();
    }

    public Optional<Alumno> obtenerAlumnoPorId(Long id) {
        return alumnoRepository.findById(id);
    }

    public Alumno actualizarAlumno(Long id, Alumno alumnoActualizado) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado con id " + id));

        alumno.setNombre(alumnoActualizado.getNombre());
        alumno.setApellido(alumnoActualizado.getApellido());
        alumno.setEmail(alumnoActualizado.getEmail());
        alumno.setFechaNacimiento(alumnoActualizado.getFechaNacimiento());

        return alumnoRepository.save(alumno);
    }


    public void eliminarAlumno(Long id) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado con id " + id));

        alumnoRepository.delete(alumno);
    }

}
