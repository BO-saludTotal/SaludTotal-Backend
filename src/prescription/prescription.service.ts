import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Prescription } from '../entity/prescription';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { ClinicalRecordEntry } from '../entity/clinicalRecordEntry';
import { PrescriptionMedicationDetail } from '../entity/prescriptionMedicationDetail';
import { CommercialMedicationPresentation } from '../entity/commercialMedicationPresentation';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>,
    @InjectRepository(PrescriptionMedicationDetail)
    private readonly medDetailRepository: Repository<PrescriptionMedicationDetail>,
    @InjectRepository(ClinicalRecordEntry)
    private readonly entryRepository: Repository<ClinicalRecordEntry>,
    @InjectRepository(CommercialMedicationPresentation)
    private readonly medPresentationRepository: Repository<CommercialMedicationPresentation>,
    private readonly dataSource: DataSource,
  ) {}

  async create(
  recordEntry: ClinicalRecordEntry, // <--- ACEPTA LA ENTIDAD COMPLETA
  createDto: CreatePrescriptionDto,
): Promise<Prescription> {
  // Ya no necesitas buscar recordEntry aquí, ya lo tienes
  // if (!recordEntry) { ... } // Esta validación se hace en el servicio que llama

  const queryRunner = this.dataSource.createQueryRunner(); // Usar su propia transacción o participar en la existente
  await queryRunner.connect();
  await queryRunner.startTransaction(); // O usar el queryRunner del servicio padre si se pasa

  try {
    const newPrescriptionEntity = queryRunner.manager.create(Prescription, {
      // clinicalRecordEntryId: recordEntry.id, // Puedes usar el ID
      clinicalRecordEntry: recordEntry,      // O asignar la entidad directamente si la relación está configurada
      prescriptionDate: new Date(createDto.prescriptionDate),
    });
      const savedPrescription = await queryRunner.manager.save(newPrescriptionEntity);

      const medicationDetails: PrescriptionMedicationDetail[] = [];
      for (const medDto of createDto.medications) {
        const presentation = await this.medPresentationRepository.findOneBy({ id: medDto.medicationPresentationId });
        if (!presentation) {
          throw new BadRequestException(`Presentación de medicamento con ID ${medDto.medicationPresentationId} no encontrada.`);
        }
        const detail = queryRunner.manager.create(PrescriptionMedicationDetail, {
          prescriptionId: savedPrescription.id,
          ...medDto,
        });
        medicationDetails.push(await queryRunner.manager.save(detail));
      }

      await queryRunner.commitTransaction();
    
      savedPrescription.medicationDetails = medicationDetails; 
      return savedPrescription;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Error creando prescripción:", error);
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al crear la prescripción.');
    } finally {
      await queryRunner.release();
    }
  }

  async findAllByEntryId(entryId: number): Promise<Prescription[]> {
    return this.prescriptionRepository.find({
      where: { clinicalRecordEntryId: entryId },
      relations: { 
        medicationDetails: {
          medicationPresentation: {
            generalMedication: true,
          },
        },
      },
      order: { prescriptionDate: 'DESC' }
    });
  }

  async findOne(prescriptionId: number): Promise<Prescription> {
    const prescription = await this.prescriptionRepository.findOne({
        where: { id: prescriptionId },
        relations: {
            medicationDetails: {
                medicationPresentation: {
                    generalMedication: true,
                },
            },
        },
    });
    if (!prescription) {
      throw new NotFoundException(`Prescripción con ID ${prescriptionId} no encontrada.`);
    }
    return prescription;
  }

  async remove(prescriptionId: number): Promise<void> {

    const prescription = await this.findOne(prescriptionId); 
    await this.prescriptionRepository.remove(prescription);
  }
}