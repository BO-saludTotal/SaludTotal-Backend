import { Request, Response } from 'express';
import { pool } from '../config/db';
import { Usuario } from '../models/user.model';

export const crearUsuario = async (req: Request, res: Response) => {
  const {
    NombreCompleto,
    TipoUsuario,
    CredencialAcceso,
    Contrasena,
    NumeroTelefonico,
    CorreoElectronicoAlternativo,
    DatosPaciente_InfoDemografica,
    DatosMedico_InfoProfesional,
    DatosAdmin_InfoRol,
    DatosGobierno_InfoEntidad,
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO Usuarios (
        NombreCompleto, TipoUsuario, CredencialAcceso, ContrasenaHash,
        NumeroTelefonico, CorreoElectronicoAlternativo,
        DatosPaciente_InfoDemografica, DatosMedico_InfoProfesional,
        DatosAdmin_InfoRol, DatosGobierno_InfoEntidad
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        NombreCompleto,
        TipoUsuario,
        CredencialAcceso,
        Contrasena,
        NumeroTelefonico,
        CorreoElectronicoAlternativo,
        JSON.stringify(DatosPaciente_InfoDemografica || {}),
        JSON.stringify(DatosMedico_InfoProfesional || {}),
        JSON.stringify(DatosAdmin_InfoRol || {}),
        JSON.stringify(DatosGobierno_InfoEntidad || {})
      ]
    );

    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};



