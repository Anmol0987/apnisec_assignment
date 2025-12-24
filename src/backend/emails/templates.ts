export class EmailTemplates {
  static welcome(name: string) {
    return `
      <h2>Welcome to ApniSec, ${name}</h2>
      <p>We're excited to have you onboard.</p>
      <p>You can now raise security issues and track them from your dashboard.</p>
      <br/>
      <strong>– Team ApniSec</strong>
    `;
  }
  static issueCreated(data: {
    title: string;
    description: string;
    type: string;
  }) {
    return ` <h2>New Security Issue Created</h2>
      <p><strong>Type:</strong> ${data.type}</p>
      <p><strong>Title:</strong> ${data.title}</p>
      <p><strong>Description:</strong> ${data.description}</p>
      <br/>
      <p>Our team will review this shortly.</p>
      <strong>– ApniSec Security Team</strong>`;
  }

  static profileUpdated(name: string) {
    return `
      <h2>Profile Updated</h2>
      <p>Hello ${name},</p>
      <p>Your profile information was updated successfully.</p>
      <br/>
      <strong>– Team ApniSec</strong>
    `;
  }
}
