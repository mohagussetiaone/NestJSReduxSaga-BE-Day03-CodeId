import { Users } from 'output/entities/Users';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'output/entities/Customer';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private serviceRepo: Repository<Customer>,
  ) {}
  public async getCustomers() {
    return await this.serviceRepo.find({
      relations: {
        user: true,
      },
    });
  }

  public async getCustomerById(id: number) {
    return await this.serviceRepo.findOne({
      where: { id: id },
      relations: {
        user: true,
      },
    });
  }

  public async addCustomer(firstname: string, lastname: string, user: Users) {
    try {
      const customer = await this.serviceRepo.save({
        firstname: firstname,
        lastname: lastname,
        user: user,
        createdat: new Date(),
        updatedat: new Date(),
      });
      return customer;
    } catch (error) {
      return error.message;
    }
  }

  public async updateCustomer(
    id: number,
    firstname: string,
    lastname: string,
    user: Users,
  ) {
    try {
      const customer = await this.serviceRepo.update(id, {
        firstname: firstname,
        lastname: lastname,
        user: user,
        updatedat: new Date(),
      });
      return customer;
    } catch (error) {
      return error.message;
    }
  }

  public async deleteCustomer(id: number) {
    try {
      const customer = await this.serviceRepo.delete(id);
      return customer;
    } catch (error) {
      return error.message;
    }
  }
}
