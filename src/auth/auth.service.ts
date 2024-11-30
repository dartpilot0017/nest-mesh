/* eslint-disable prettier/prettier */
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService, // Inject JwtService
  ) {}

  // Register a new user (client or contractor)
  async register(registerDto: RegisterDto) {
    const { email, password, name, role } = registerDto;

    // Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      role,
    });

    return await this.userRepository.save(user);
  }

  // Login Method
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    // Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT Token
    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    // Return user info along with token
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name, // Include name in response
        role: user.role,
      },
    };
  }
}
