import nodemailer from "nodemailer"
import { envs } from "../../config/plugins/envs.plugin"

interface SendMailOptions {
  to: string | string[],
  subject: string,
  htmlBody: string,
  attachments?: Attachment[]
}

interface Attachment {
  filename: string,
  path: string
}

export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY
    }
  })

  constructor(
    // transporter can be inject as a dependency
  ) {
  }

  async sendMail(options: SendMailOptions): Promise<boolean> {
    const { to, htmlBody, subject, attachments = [] } = options;
    try {
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      })
      return true;
    } catch (error) {
      return false
    }
  }

  async sendMailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = "Logs del servidor"
    const htmlBody = `
      <h3>Logs de sistema - NOC</h3>
      </hr>
      <p>Reporte de logs del file system</p>
      `
    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
    ]
    return this.sendMail({
      to,
      subject,
      htmlBody,
      attachments
    })
  }
}