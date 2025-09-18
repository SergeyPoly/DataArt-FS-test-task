import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import RequestWithUser from '../auth/types/request-with-user.interface';


@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Req() req: RequestWithUser): Promise<Book> {
    const userId = req.user['id'];
    return this.bookService.create(createBookDto, userId);
  }

  @Get()
  async findAll(@Req() req: RequestWithUser): Promise<Book[]> {
    const userId = req.user['id'];
    return this.bookService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: RequestWithUser): Promise<Book> {
    const userId = req.user['id'];
    return this.bookService.findOne(id, userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto, @Req() req: RequestWithUser): Promise<Book> {
    const userId = req.user['id'];
    return this.bookService.update(id, updateBookDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Req() req: RequestWithUser): Promise<void> {
    const userId = req.user['id'];
    await this.bookService.remove(id, userId);
  }
}
