// barbers-dev-panel/src/components/StaticPages/CancellationRefundPolicy.js

import React from 'react';
import { Wallet } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="section-card">
      <h2 className="section-title">
        <Wallet size={22} /> Cancellation and Refund Policy
      </h2>
      <div className="static-content">
        <p>This Cancellation and Refund Policy outlines the terms under which subscriptions and services provided through the Barbers App Developer Panel can be cancelled and refunds may be issued.</p>

        <h3>1. Subscription Cancellation</h3>
        <p>Users or shop owners may cancel their subscription at any time. Cancellation will take effect at the end of the current billing period. No pro-rata refunds will be issued for partial use of a subscription period.</p>

        <h3>2. Refund Eligibility</h3>
        <p>Refunds are generally not provided for digital services or subscriptions once the service has commenced or the subscription period has begun. Exceptions may be considered on a case-by-case basis under the following circumstances:</p>
        <ul>
          <li>If there was a technical error on our part that prevented the service from being delivered as described.</li>
          <li>If the service was misrepresented in a material way.</li>
        </ul>
        <p>Refund requests must be submitted within [e.g., 7 days] of the transaction date for consideration. All refund decisions are at the sole discretion of [Your Company Name].</p>

        <h3>3. How to Request a Refund</h3>
        <p>To request a refund, please contact our support team at [Your Contact Email] with your transaction details and the reason for your request. We will review your request and notify you of the approval or rejection of your refund.</p>

        <h3>4. Non-Refundable Items/Services</h3>
        <p>The following items/services are generally non-refundable:</p>
        <ul>
          <li>Free trial periods that convert to paid subscriptions.</li>
          <li>Services that have been fully utilized.</li>
          <li>Any third-party fees or charges.</li>
        </ul>

        <h3>5. Changes to Policy</h3>
        <p>We reserve the right to modify this Cancellation and Refund Policy at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the service after any such changes constitutes your acceptance of the new policy.</p>

        <h3>6. Contact Us</h3>
        <p>If you have any questions about this policy, please contact us at [Your Contact Email].</p>
      </div>
    </div>
  );
};

export default RefundPolicy;