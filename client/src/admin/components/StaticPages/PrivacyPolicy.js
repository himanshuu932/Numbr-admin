import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="section-card">
      <h2 className="section-title">
        <Shield size={22} /> Privacy Policy
      </h2>
      <div className="static-content">
        <p>This Privacy Policy describes how Numbr App collects, uses, and discloses your information when you use our services for managing barber shops and customer queues.</p>

        <h3>1. Information We Collect</h3>
        <p>We collect information to provide and improve our service. This includes:</p>
        <ul>
          <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to, your name and email address. We collect your email for OTP (One-Time Password) authentication to secure your account and for communication. Your name is collected for display within the barber shop's queue system, allowing shop owners and other customers in the queue to identify you by name only.</li>
          <li><strong>Payment Information:</strong> For shop owners subscribing to our services, we collect payment-related information, which is processed by our third-party payment gateway partner, Razorpay. We do not store your full credit card details on our servers.</li>
          <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your device's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data.</li>
        </ul>

        <h3>2. Use of Data</h3>
        <p>We use the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain the Service, including queue management and barber shop administration features.</li>
          <li>To process subscription payments for shop owners.</li>
          <li>To authenticate users via OTP and manage user accounts.</li>
          <li>To display your name within the barber shop's queue for operational purposes.</li>
          <li>To notify you about changes to our Service.</li>
          <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
          <li>To provide customer support and manage refund requests.</li>
          <li>To monitor the usage of the Service and improve its functionality.</li>
          <li>To detect, prevent, and address technical issues or fraudulent activities.</li>
        </ul>

        <h3>3. Disclosure of Data</h3>
        <p>We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
        <ul>
          <li>**To Service Providers:** We may employ third-party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services, or to assist us in analyzing how our Service is used. This includes sharing necessary payment information with Razorpay for processing transactions.</li>
          <li>**Within the Queue System:** Your name will be visible to barber shop owners and other customers within the queue system for the sole purpose of queue management and identification. No other personal data is shared in this context.</li>
          <li>To comply with a legal obligation or respond to valid requests by public authorities (e.g., a court or government agency).</li>
          <li>To protect and defend the rights or property of Numbr App.</li>
          <li>To prevent or investigate possible wrongdoing in connection with the Service.</li>
          <li>To protect the personal safety of users of the Service or the public.</li>
          <li>To protect against legal liability.</li>
        </ul>

        <h3>4. Security of Data</h3>
        <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

        <h3>5. Links to Other Sites</h3>
        <p>Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third-party's site. We strongly advise you to review the Privacy Policy of every site you visit. This includes, but is not limited to, the privacy policy of our payment gateway provider, Razorpay.</p>

        <h3>6. Changes to This Privacy Policy</h3>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

        <h3>7. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at bludgers52@gmail.com.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
