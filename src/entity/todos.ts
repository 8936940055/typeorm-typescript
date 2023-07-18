import { Entity,Column,PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Todos extends BaseEntity{
    @PrimaryGeneratedColumn()
     id: number = 0;
     @Column()
     title: string='';
     @Column()
    description: string ='';
    @Column()
    status: boolean= false;
    @CreateDateColumn()
    created_at: Date | undefined;
    @UpdateDateColumn()
    updated_at: Date | undefined;
}


// id: Primary key, auto-incrementing integer.
// - title: Todo item title (string).
// - description: Todo item description (string).
// - status: Todo item status (boolean, representing completed or not completed).
// - created_at Timestamp for when the Todo item was created.
// - updated_at Timestamp for when the Todo item was last updated.