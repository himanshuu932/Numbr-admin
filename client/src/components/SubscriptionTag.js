// barbers-dev-panel/src/components/SubscriptionTag.js

import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const SubscriptionTag = ({ status }) => {
  let tagClass = '';
  let tagText = '';
  let IconComponent = null;

  switch (status) {
    case 'active':
      tagClass = 'status-active';
      tagText = 'Active';
      IconComponent = CheckCircle;
      break;
    case 'trial':
      tagClass = 'status-trial';
      tagText = 'Trial';
      IconComponent = Clock;
      break;
    case 'expired':
      tagClass = 'status-expired';
      tagText = 'Expired';
      IconComponent = XCircle;
      break;
    default:
      tagClass = 'status-expired';
      tagText = 'N/A';
      IconComponent = XCircle;
  }

  return (
    <span className={`status-tag ${tagClass}`}>
      {IconComponent && <IconComponent size={14} strokeWidth={2.5} />}
      {tagText}
    </span>
  );
};

export default SubscriptionTag;