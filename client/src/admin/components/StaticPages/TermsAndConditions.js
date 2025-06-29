import React from 'react';
import { FileText } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="section-card">
      <h2 className="section-title">
        <FileText size={22} /> Terms and Conditions
      </h2>
      <div className="static-content">
        <p>Welcome to the Numbr App. These terms and conditions outline the rules and regulations for the use of our application and services, for both barber shop owners and customers.</p>

        <h3>1. Acceptance of Terms</h3>
        <p>By accessing or using our services, you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, then you may not access the service.</p>

        <h3>2. Service Description</h3>
        <p>The Numbr App provides a platform for managing barber shops, allowing shop owners to administer their services and customers to join queues. This includes subscription services for shop owners to access management tools, and queueing functionality for customers to book or join queues at barber shops. Customers can use the app to view queue status and receive updates, while shop owners can manage their appointments and customer flow.</p>

        <h3>3. User Accounts</h3>
        <p>If you create an account on Numbr App, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your device. You agree to accept responsibility for all activities that occur under your account or password. Account access for customers typically involves OTP (One-Time Password) authentication using your email address. Shop owners will also have dedicated accounts for managing their services.</p>

        <h3>4. Intellectual Property</h3>
        <p>The Numbr App and its original content, features, and functionality are and will remain the exclusive property of Numbr App and its licensors. All content, trademarks, service marks, logos, and designs are protected by copyright, trademark, and other laws of both India and foreign countries.</p>

        <h3>5. Payments and Subscriptions (For Shop Owners)</h3>
        <p>
          Shop owners may subscribe to various service plans offered by Numbr App.
          <br />
          <strong>Subscription Fees:</strong> All subscription fees are clearly stated at the time of purchase. Fees are recurring based on the chosen billing cycle (e.g., monthly, annually).
          <br />
          <strong>Payment Processing:</strong> All payments are processed securely through a third-party payment gateway, Razorpay. By making a payment, you agree to Razorpay's terms and conditions and privacy policy. Numbr App does not store your full payment card details.
          <br />
          <strong>Billing:</strong> You authorize Numbr App (via Razorpay) to charge your designated payment method for all applicable subscription fees.
          <br />
          <strong>Non-Payment:</strong> Failure to pay subscription fees may result in the suspension or termination of your access to certain features or the entire service for shop owners.
          <br />
          <strong>Refunds:</strong> Refunds are handled in accordance with our Cancellation and Refund Policy, available on our website.
        </p>

        <h3>6. Limitation of Liability</h3>
        <p>In no event shall Numbr App, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Numbr App; (ii) any conduct or content of any third party on the service; (iii) any content obtained from the service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

        <h3>7. Governing Law</h3>
        <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>

        <h3>8. Changes to Terms</h3>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect by posting them on this page or via email. What constitutes a material change will be determined at our sole discretion.</p>
        <p>By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.</p>

        <h3>9. Contact Us</h3>
        <p>If you have any questions about these Terms, please contact us at bludgers52@gmail.com.</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
