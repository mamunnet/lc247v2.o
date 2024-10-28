import React from 'react';

interface ReportStatusBadgeProps {
  status: 'pending' | 'resolved' | 'rejected';
}

const ReportStatusBadge: React.FC<ReportStatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    resolved: 'bg-emerald-500/20 text-emerald-400',
    rejected: 'bg-red-500/20 text-red-400'
  };

  const statusText = {
    pending: 'অপেক্ষমান',
    resolved: 'সমাধান হয়েছে',
    rejected: 'প্রত্যাখ্যাত'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
      {statusText[status]}
    </span>
  );
};

export default ReportStatusBadge;
