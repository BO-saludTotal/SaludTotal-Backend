import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './data-source';
import { MedicalAppointmentModule } from './medical-appointment/medical-appointment.module';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsuariosController } from './usuarios/usuarios.controller';
import { UsuariosService } from './usuarios/usuarios.service';
import { DoctorDetailModule } from './doctor-detail/doctor-detail.module';
import { HealthEntityModule } from './health-entity/health-entity.module';
import { AdministrativeStaffDetailModule } from './administrative-staff-detail/administrative-staff-detail.module';
import { DoctorHealthEntityAffiliationModule } from './doctor-health-entity-affiliation/doctor-health-entity-affiliation.module';
import { DoctorSpecialtyCertificationModule } from './doctor-specialty-certification/doctor-specialty-certification.module';
import { GeneralMedicationModule } from './general-medication/general-medication.module';
import { GovernmentStaffDetailModule } from './government-staff-detail/government-staff-detail.module';
import { HealthEntitySpecialtyModule } from './health-entity-specialty/health-entity-specialty.module';
import { MedicalSpecialtyModule } from './medical-specialty/medical-specialty.module';
import { PatientDetailsModule } from './patient-details/patient-details.module';
import { PhysicalAttentionSpaceModule } from './physical-attention-space/physical-attention-space.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { UserAdressModule } from './user-adress/user-adress.module';
import { UserAssignedRoleModule } from './user-assigned-role/user-assigned-role.module';
import { UserPhoneModule } from './user-phone/user-phone.module';


@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), MedicalAppointmentModule, DoctorDetailModule, HealthEntityModule, AdministrativeStaffDetailModule, DoctorHealthEntityAffiliationModule, DoctorSpecialtyCertificationModule, GeneralMedicationModule, GovernmentStaffDetailModule, HealthEntitySpecialtyModule, MedicalSpecialtyModule, PatientDetailsModule, PhysicalAttentionSpaceModule, PrescriptionModule, RoleModule, UserModule, UserAdressModule, UserAssignedRoleModule, UserPhoneModule],
  controllers: [AppController, AuthController, UsuariosController],
  providers: [AppService, AuthService, UsuariosService],
})
export class AppModule {}

