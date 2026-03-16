interface MyCertCardProps {
  name: string;
  authority: string;
  certNum?: string;
  passingDate: string;
  expirationDate?: string;
  onDelete?: () => void;
}

const MyCertCard = ({
  name,
  authority,
  certNum,
  passingDate,
  expirationDate,
  onDelete,
}: MyCertCardProps) => {
  return (
    <article
      className="
        w-full
        rounded-2xl
        border
        border-gray-100
        bg-white
        p-5
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">{name}</h2>
          <p className="mt-2 text-base text-gray-500">{authority}</p>
          <p className="mt-2 text-sm text-gray-500">
            자격증 번호: {certNum || "-"}
          </p>
        </div>

        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-white
              text-sm
              font-bold
              text-gray-500
              transition
              hover:bg-gray-50
              hover:text-gray-700
            "
          >
            X
          </button>
        )}
      </div>

      <div className="my-5 h-px bg-gray-100" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">합격일</p>
          <p className="mt-1 text-lg font-bold text-gray-900">{passingDate}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">만료일</p>
          <p className="mt-1 text-lg font-bold text-gray-900">
            {expirationDate ?? "-"}
          </p>
        </div>
      </div>
    </article>
  );
};

export default MyCertCard;