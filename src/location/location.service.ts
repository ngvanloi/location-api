import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { CreateLocationDto } from './dtos/create-location-dto';
import { Location } from './entities/location.entity';
import { UpdateLocationDto } from './dtos/update-location-dto';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(
    @InjectRepository(Location)
    private locationRepository: TreeRepository<Location>,
  ) {}

  async findAll(): Promise<Location[]> {
    this.logger.log('Fetching all locations');
    return await this.locationRepository.findTrees();
  }

  async findById(id: number): Promise<Location> {
    this.logger.log(`Fetching location with ID ${id}`);
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['children'],
    });

    if (!location) {
      this.logger.warn(`Location with ID ${id} not found`);
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }

  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    this.logger.log('Creating a new location');
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
    this.logger.log(`Location created with ID ${newLocation.id}`);
    return await this.locationRepository.save(newLocation);
  }

  async update(
    id: number,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    this.logger.log(`Updating location with ID ${id}`);
    const locationUpdate = await this.locationRepository.preload({
      id,
      ...updateLocationDto,
    });

    if (!locationUpdate) {
      this.logger.warn(`Location with ID ${id} not found for update`);
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    await this.locationRepository.save(locationUpdate);
    this.logger.log(`Location with ID ${id} updated successfully`);
    return locationUpdate;
  }

  async delete(id: number): Promise<void> {
    this.logger.log(`Deleting location with ID ${id}`);

    const result = await this.locationRepository.delete(id);

    if (result.affected === 0) {
      this.logger.warn(`Location with ID ${id} not found for deletion`);
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    this.logger.log(`Location with ID ${id} deleted successfully`);
  }
}
