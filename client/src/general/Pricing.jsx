import React, { useState } from 'react';
import { Check, Mail, Star } from 'lucide-react';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Free Trial',
      price: 'Free',
      period: 'for 2 months',
      description: 'Complete barbershop management system',
      features: [
        'Digital queue management',
        'Customer appointment booking',
        'Real-time wait time estimates',
        'SMS & WhatsApp notifications',
        'Barber schedule management',
        'Customer history & preferences',
        'Walk-in queue system',
        'Multi-location support',
        'Analytics & reporting',
        'Mobile app for customers'
      ],
      popular: true,
      cta: 'Start Managing Queues',
      trial: '2 months completely free'
    },
    {
      name: 'Paid Plans',
      price: 'Custom',
      period: 'contact us',
      description: 'Continue after your free trial',
      features: [
        'All queue management features',
        'Flexible pricing per chair/location',
        'Custom integrations',
        'Priority technical support',
        'Staff training included',
        'Custom branding options',
        'Advanced analytics',
        'Payment processing integration',
        'Loyalty program features',
        'Marketing automation tools'
      ],
      popular: false,
      cta: 'Get Custom Pricing'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Modernize Your Barbershop Today</h1>
        <p className="text-xl text-gray-600 mb-8">Complete queue management system - Try all features free for 2 months</p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <span className={`mr-3 ${!isAnnual ? 'text-black' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAnnual ? 'bg-black' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`ml-3 ${isAnnual ? 'text-black' : 'text-gray-500'}`}>
            Annual
            <span className="ml-1 text-sm bg-black text-white px-2 py-1 rounded">Save 35%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto justify-center">{plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'bg-black text-white border-2 border-black shadow-2xl'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Start Here
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>
                
                <div className="mb-4">
                  {plan.originalPrice && (
                    <span className="text-lg line-through text-gray-400 mr-2">
                      {plan.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ml-1 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                </div>

                {plan.trial && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {plan.trial}
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 mt-0.5 ${
                      plan.popular ? 'text-white' : 'text-black'
                    }`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Eliminate Wait Times?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Get pricing tailored to your barbershop size and discuss how we can help streamline your operations
          </p>
          
          <div className="flex items-center justify-center space-x-2 bg-white rounded-xl p-4 inline-flex">
            <Mail className="w-5 h-5 text-gray-600" />
            <a 
              href="mailto:bludgers52@gmail.com"
              className="text-lg font-medium text-black hover:text-gray-600 transition-colors"
            >
              bludgers52@gmail.com
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-left max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">What happens after 2 months?</h3>
                <p className="text-gray-600">
                  After your free trial, contact us to discuss flexible paid plans based on your shop size and needs.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Do customers need to download an app?</h3>
                <p className="text-gray-600">
                  Customers can join queues via web browser or optional mobile app. No downloads required.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Works with multiple barbers?</h3>
                <p className="text-gray-600">
                  Yes! Manage individual queues for each barber or a shared shop queue system.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">How do customers get notified?</h3>
                <p className="text-gray-600">
                  Automatic SMS and WhatsApp notifications when their turn is approaching.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Can I track busy hours?</h3>
                <p className="text-gray-600">
                  Yes! Built-in analytics show peak hours, average wait times, and customer patterns.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Setup assistance included?</h3>
                <p className="text-gray-600">
                  Full setup support and staff training included with all paid plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}