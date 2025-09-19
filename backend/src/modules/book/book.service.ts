import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, userId: string): Promise<Book> {
    const book = this.bookRepository.create({ ...createBookDto, userId });
    return this.bookRepository.save(book);
  }

  async findAll(userId: string): Promise<Book[]> {
    return this.bookRepository.find({
      where: { userId },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string, userId: string): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id, userId } });
    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto, userId: string): Promise<Book> {
    const book = await this.findOne(id, userId);
    this.bookRepository.merge(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async remove(id: string, userId: string): Promise<void> {
    const book = await this.findOne(id, userId);
    await this.bookRepository.remove(book);
  }
}
