import { cn } from '@/lib/utils';

import { CollaborationCardProps } from '@/types/page/collaboration';

export const CollaborationCard = ({
  collaboration,
  onJoin,
  onViewDetails,
}: CollaborationCardProps) => {
  const {
    id,
    title,
    initiator,
    status,
    progress,
    currentAmount,
    targetAmount,
    unit,
    description,
    participantsText,
    savingsPercentage,
    borderColor,
    statusColor,
    hasJoinButton,
  } = collaboration;

  return (
    <div
      className={`rounded-lg border-l-4 bg-white ${borderColor} border-t border-r border-b p-4 shadow-sm`}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">Inisiator: {initiator}</p>
        </div>

        {/* Status Badge */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
        >
          {status}
        </span>
      </div>

      {/* Progress Section (for Aktif status) */}
      {status === 'Aktif' && progress !== undefined && (
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-900">
              {currentAmount}/{targetAmount} {unit}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mb-3 h-3 w-full rounded-full bg-gray-200">
            <div
              className="h-3 rounded-full bg-green-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{participantsText}</span>
            {savingsPercentage && (
              <span className="text-sm font-medium text-purple-600">
                Hemat {savingsPercentage}%
              </span>
            )}
          </div>
        </div>
      )}

      {/* Description Section (for Perencanaan status) */}
      {status === 'Perencanaan' && description && (
        <div className="mb-4">
          <p className="mb-3 text-sm text-gray-700">{description}</p>
          <p className="text-sm text-gray-700">{participantsText}</p>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-4">
        {hasJoinButton ? (
          <button
            onClick={() => onJoin(id)}
            className="w-full cursor-pointer rounded-lg border border-blue-300 bg-blue-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-blue-200"
          >
            Bergabung
          </button>
        ) : (
          <button
            onClick={() => onViewDetails(id)}
            className={cn(
              'w-full cursor-pointer rounded-lg px-4 py-2 font-medium text-white transition-colors',
              status === 'Aktif'
                ? 'bg-[#FF5C00] hover:bg-[#e54f00]'
                : 'bg-gray-400 hover:bg-gray-500',
            )}
          >
            Lihat Detail
          </button>
        )}
      </div>
    </div>
  );
};
