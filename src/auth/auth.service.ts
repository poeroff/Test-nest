import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { randomBytes , scrypt as _scrypt } from 'crypto';
import _ from 'lodash';
import { promisify } from 'util';
const scrypt = promisify(_scrypt)
@Injectable()
export class AuthService {
 
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>, private jwtservice : JwtService
  ) {}

  async create(body: CreateAuthDto) {
    const user = await this.authRepository.findOne({where : {email : body.email}})
    if(!_.isNil(user)){
      throw new ConflictException("이미 가입된 ID입니다")
    }
    const salt = randomBytes(8).toString("hex")
    const hash  =await scrypt(body.Password ,salt, 32) as Buffer

    const result = salt + "." + hash.toString("hex")
    if(body.privilege === true){
      const newuser = this.authRepository.create({email: body.email , Password : result , privilege : true})
      return this.authRepository.save(newuser)

    }
    const newuser = this.authRepository.create({email: body.email , Password : result})
    return this.authRepository.save(newuser)

   
  }



   async login(email : string , password : string ) {
    console.log(email)
    
    const user = await this.authRepository.findOne({where : {email : email, deletedAt : null}})
    console.log(user)
    if(_.isNil(user)){
      throw new NotFoundException("유저를 찾을 수 없습니다")
    }
    
    const [salt , storeHash ] =  user.Password.split(".")
    const hash = await scrypt(password , salt , 32) as Buffer
   
    if(storeHash!== hash.toString("hex") ){
      throw new UnauthorizedException("유저의 비밀번호가 올바르지 않습니다")
    }

    const payload = {id : user.id}
    const accessToken = await this.jwtservice.signAsync(payload, { expiresIn: '1h' });


    return {token : "Bearer " + accessToken ,statusCode : 200 ,privilege : user.privilege}
   }
}
