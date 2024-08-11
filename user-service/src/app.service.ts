import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const newUser = this.userRepo.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepo.save(newUser);
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 9;
    const salt = await bcrypt.genSalt(saltRounds);

    return await bcrypt.hash(password, salt);
  }

  async findAllUser() {
    return await this.userRepo.find();
  }

  async findOneUser(id: number) {
    const user = await this.userRepo.find({ where: { id } });
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return user;
  }

  async updateUser(id: number, updatedUserDto: UpdateUserDto) {
    const userToUpdate = await this.userRepo.find({ where: { id } });

    if (!userToUpdate) {
      throw new NotFoundException('User Does Not Exist');
    }

    Object.assign(userToUpdate, updatedUserDto);

    return userToUpdate;
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.find({ where: { id } });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return this.userRepo.remove(user);
  }
}
