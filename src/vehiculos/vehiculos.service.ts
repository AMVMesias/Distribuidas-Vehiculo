import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { Vehiculo } from './entities/vehiculo.entity';
import { FactoryVehiculos } from './factory/factory-vehiculo';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async create(createVehiculoDto: CreateVehiculoDto) {
    const existe = await this.vehiculoRepository.findOne({ 
      where: { placa: createVehiculoDto.datos.placa },
    });
    if(existe){
      throw new ConflictException(`Ya existe un vehículo con la placa ${createVehiculoDto.datos.placa}`);

    }

    const vehiculo = FactoryVehiculos.crear(createVehiculoDto);
    return this.vehiculoRepository.save(vehiculo);


  }



  findAll(): Promise<Vehiculo[]> {
    return this.vehiculoRepository.find();
  }

  async findOne(id: string) {
    const existe = await this.vehiculoRepository.findOne({ where: { id } });
    if (!existe) {
      throw new NotFoundException(`No se encontró un vehículo con el ID ${id}`);
    }
    return existe;
  }

  async update(id: string, updateVehiculoDto: UpdateVehiculoDto) {
    const vehiculo = await this.findOne(id);
    Object.assign(vehiculo, updateVehiculoDto);
    return this.vehiculoRepository.save(vehiculo);
  }

  async remove(id: string) {
    const vehiculo = await this.findOne(id);
    await this.vehiculoRepository.remove(vehiculo);
    return vehiculo;
  }
}
