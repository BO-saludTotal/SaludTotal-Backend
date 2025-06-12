import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entity/user';
import { UserPhone } from './entity/userPhone';
import { MedicalAppointment } from './entity/medicalAppointment';
import { AvailabilitySlot } from './entity/availabilitySlot';
import { PatientDetail } from './entity/patientDetail';
import { AttentionType } from './entity/attentionType';
import { AppointmentChangeHistory } from './entity/appointmentChangeHistory';
import { ClinicalRecordEntry } from './entity/clinicalRecordEntry';
import { DoctorDetail } from './entity/doctorDetail';
import { DoctorSpecialtyCertification } from './entity/doctorSpecialtyCertification';
import { HealthEntity } from './entity/healthEntity';
import { AdministrativeStaffDetail } from './entity/administrativeStaffDetail';
import { AuditActionType } from './entity/auditActionType';
import { ClinicalRecordAttachment } from './entity/clinicalRecordAttachment';
import { ClinicalRecordDiagnosis } from './entity/clinicalRecordDiagnosis';
import { CommercialMedicationPresentation } from './entity/commercialMedicationPresentation';
import { DiagnosisCode } from './entity/diagnosisCode';
import { DoctorHealthEntityAffiliation } from './entity/doctorHealthEntityAffiliation';
import { DoctorScheduleTemplate } from './entity/doctorScheduleTemplate';
import { ExamParameter } from './entity/examParameter';
import { ExamResult } from './entity/examResult';
import { ExamResultDetail } from './entity/examResultDetail';
import { GeneralMedication } from './entity/generalMedication';
import { GeneratedReportHistory } from './entity/generatedReportHistory';
import { GovernmentStaffDetail } from './entity/governmentStaffDetail';
import { HealthEntitySpecialty } from './entity/healthEntitySpecialty';
import { MedicalEventType } from './entity/medicalEventType';
import { MedicalGeneralCatalog } from './entity/medicalGeneralCatalog';
import { MedicalSpecialty } from './entity/medicalSpecialty';
import { NotificationType } from './entity/notificationType';
import { PhysicalAttentionSpace } from './entity/physicalAttentionSpace';
import { Prescription } from './entity/prescription';
import { PrescriptionMedicationDetail } from './entity/prescriptionMedicationDetail';
import { ReportType } from './entity/reportType';
import { Role } from './entity/role';
import { ScheduleBlockException } from './entity/scheduleBlockException';
import { SentNotificationLog } from './entity/sentNotificationLog';
import { SystemAuditLog } from './entity/systemAuditLog';
import { UserEmail } from './entity/userEmail';
import { UserAssignedRole } from './entity/userAssignedRole';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin2402',
  database: process.env.DB_NAME ||'STotal',
  synchronize: true,
  logging: true,
  entities: [
    MedicalAppointment,
    User,
    UserPhone,
    AvailabilitySlot,
    PatientDetail,
    AttentionType,
    AppointmentChangeHistory,
    DoctorDetail,
    MedicalAppointment,
    DoctorSpecialtyCertification,
    ClinicalRecordEntry,
    HealthEntity,
    AdministrativeStaffDetail,
    AuditActionType,
    ClinicalRecordAttachment,
    ClinicalRecordDiagnosis,
    CommercialMedicationPresentation,
    DiagnosisCode,
    DoctorHealthEntityAffiliation,
    DoctorScheduleTemplate,
    ExamParameter,
    ExamResult,
    ExamResultDetail,
    GeneralMedication,
    GeneratedReportHistory,
    GovernmentStaffDetail,
    HealthEntitySpecialty,
    MedicalEventType,
    MedicalGeneralCatalog,
    MedicalSpecialty,
    NotificationType,
    PatientDetail,
    PhysicalAttentionSpace,
    Prescription,
    PrescriptionMedicationDetail,
    ReportType,
    Role,
    ScheduleBlockException,
    SentNotificationLog,
    SystemAuditLog,
    UserEmail,
    UserAssignedRole,
  ],
  subscribers: [],
  migrations: [],
};

export const AppDataSource = new DataSource(dataSourceOptions);
