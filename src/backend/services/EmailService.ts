import { Resend } from "resend";
import { EmailTemplates } from "../emails/templates";
export class EmailService {
  private resend = new Resend(process.env.RESEND_APIKEY!);
  private from = process.env.EMAIL_FROM!;

  async sendWelcomeEmail(email: string, name: string) {
    await this.resend.emails.send({
      from: this.from,
      to: email,
      subject: "Welcome to ApniSec",
      html: EmailTemplates.welcome(name),
    });
  }

  async sendIssueCreatedEmail(
    email: string,
    issue: { title: string; description: string; type: string }
  ) {
    await this.resend.emails.send({
      from: this.from,
      to: email,
      subject: "Security Issue Created",
      html: EmailTemplates.issueCreated(issue),
    });
  }

  async sendProfileUpdatedEmail(email: string, name: string) {
    await this.resend.emails.send({
      from: this.from,
      to: email,
      subject: "Profile Updated",
      html: EmailTemplates.profileUpdated(name),
    });
  }
}
