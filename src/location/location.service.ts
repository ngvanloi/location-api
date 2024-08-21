import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, TreeRepository, UpdateResult } from 'typeorm';
import { CreateLocationDto } from './dtos/create-location-dto';
import { Location } from './entities/location.entity';
import { UpdateLocationDto } from './dtos/update-location-dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: TreeRepository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    return await this.locationRepository.findTrees();
  }

  async findById(id: number): Promise<Location> {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['children'],
    });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const newLocation = new Location();
    newLocation.building = createLocationDto.building;
    newLocation.locationName = createLocationDto.locationName;
    newLocation.locationNumber = createLocationDto.locationNumber;
    newLocation.area = createLocationDto.area;

    if (createLocationDto.parentId) {
      const parent = await this.locationRepository.findOneBy({
        id: createLocationDto.parentId,
      });
      newLocation.parent = parent;
    }
    return await this.locationRepository.save(newLocation);
  }

  async update(id: number, location: UpdateLocationDto): Promise<UpdateResult> {
    return await this.locationRepository.update(id, location);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.locationRepository.delete(id);
  }
}
