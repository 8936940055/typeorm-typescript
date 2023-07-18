import { Entity,Column,PrimaryGeneratedColumn, BaseEntity} from "typeorm"
import { IsNotEmpty, IsEmail } from "class-validator";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
     id: number = 0;
     @Column()
     user: string='';
     @Column()
     @IsEmail()
     email: string ='';
}