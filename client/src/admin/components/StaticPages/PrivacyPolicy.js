// barbers-dev-panel/src/components/StaticPages/PrivacyPolicy.js

import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="section-card">
      <h2 className="section-title">
        <Shield size={22} /> Privacy Policy
      </h2>
      <div className="static-content">
        <p>This Privacy Policy describes how [Your Company Name] collects, uses, and discloses your information when you use our Barbers App Developer Panel.</p>

        <h3>1. Information We Collect</h3>
        <p>We collect information to provide and improve our service. This includes:</p>
        <ul>
          <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to, your name, phone number, and email address (if provided).</li>
          <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
        </ul>

        <h3>2. Use of Data</h3>
        <p>We use the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain the Service</li>
          <li>To notify you about changes to our Service</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
          <li>To provide customer support</li>
          <li>To monitor the usage of the Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <h3>3. Disclosure of Data</h3>
        <p>We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
        <ul>
          <li>To comply with a legal obligation</li>
          <li>To protect and defend the rights or property of [Your Company Name]</li>
          <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
          <li>To protect the personal safety of users of the Service or the public</li>
          <li>To protect against legal liability</li>
        </ul>

        <h3>4. Security of Data</h3>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

        <h3>5. Links to Other Sites</h3>
        <p>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</p>

        <h3>6. Changes to This Privacy Policy</h3>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

        <h3>7. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at [Your Contact Email].</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;