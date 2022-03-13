import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }
  sendActivationMail(email: string, confirmationToken: string): void {
    const url = `${this.configService.get<string>('API_URL')}/auth/activation/${confirmationToken}`;
    this.transporter.sendMail({
      to: email,
      subject: 'Confirm Email',
      html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
    });
  }
}
