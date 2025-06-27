// barbers-dev-panel/src/components/StaticPages/TermsAndConditions.js

import React from 'react';
import { FileText } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="section-card">
      <h2 className="section-title">
        <FileText size={22} /> Terms and Conditions
      </h2>
      <div className="static-content">
        <p>Welcome to the Barbers App Developer Panel. These terms and conditions outline the rules and regulations for the use of our application and services.</p>

        <h3>1. Acceptance of Terms</h3>
        <p>By accessing or using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.</p>

        <h3>2. Service Description</h3>
        <p>The Barbers App Developer Panel provides tools and insights for managing barbers, shops, and user subscriptions. This is a developer-facing tool and not intended for end-user interaction.</p>

        <h3>3. User Accounts</h3>
        <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.</p>

        <h3>4. Intellectual Property</h3>
        <p>The service and its original content, features, and functionality are and will remain the exclusive property of [Your Company Name] and its licensors.</p>

        <h3>5. Limitation of Liability</h3>
        <p>In no event shall [Your Company Name], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the service; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

        <h3>6. Governing Law</h3>
        <p>These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.</p>

        <h3>7. Changes to Terms</h3>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

        <p>By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.</p>

        <h3>8. Contact Us</h3>
        <p>If you have any questions about these Terms, please contact us at [Your Contact Email].</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;