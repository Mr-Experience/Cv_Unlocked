import React, { useState } from 'react';
import { Check } from 'lucide-react';

const Pricing = ({ onSignUp }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      price: billingCycle === 'monthly' ? '20' : '14',
      description: 'For individuals and teams getting started.',
      features: [
        'Single user license with one workspace',
        'Access to your individual asset library',
        'Access to standard templates',
        'Export content as PNG, PDF and MP4'
      ],
      featured: false
    },
    {
      name: 'Premium',
      price: billingCycle === 'monthly' ? '50' : '35',
      description: 'For power users and growing teams.',
      features: [
        'Up to 3 members inside your workspace',
        'Unlimited customization for your Corporate Design',
        'Import static & animated templates by yourself',
        'Access to pro templates'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? '100' : '70',
      description: 'For large teams and sub-accounts.',
      features: [
        'Unlimited members for your workspace',
        'Define individual roles and permissions',
        'Custom designed templates',
        'Unlimited teams to organize multiple sub-organizations'
      ],
      featured: false
    }
  ];

  return (
    <section className="lp-pricing-section" id="pricing">
      <div className="lp-pricing-container">
        {/* Billing Toggle */}
        <div className="lp-pricing-toggle-wrapper">
          <div className="lp-pricing-toggle-container">
            <button 
              className={`lp-pricing-toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`lp-pricing-toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
            </button>
          </div>
          <p className="lp-pricing-discount-badge">(Get 30% OFF)</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="lp-pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`lp-pricing-card ${plan.featured ? 'featured' : ''}`}>
              <div className="lp-pricing-card-header">
                <div className="lp-pricing-price-row">
                  <span className="lp-pricing-currency">$</span>
                  <span className="lp-pricing-amount">{plan.price}</span>
                  <span className="lp-pricing-period">/month</span>
                </div>
                <h3 className="lp-pricing-plan-name">{plan.name}</h3>
                <p className="lp-pricing-plan-desc">{plan.description}</p>
              </div>

              <ul className="lp-pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="lp-pricing-feature-item">
                    <div className="lp-pricing-feature-icon">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="lp-pricing-card-footer">
                <button 
                  className={`lp-pricing-btn ${plan.featured ? 'featured' : ''}`}
                  onClick={onSignUp}
                >
                  Get Started
                </button>
                <a href="#features" className="lp-pricing-link">See features</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
